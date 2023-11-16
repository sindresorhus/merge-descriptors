const test = require('ava');
const mergeDescriptors = require('./index.js');

const source = {
	name: 'John',
	surname: 'Doe',
};

Object.defineProperty(source, 'fullName', {
	get() {
		return `${this.name} ${this.surname}`;
	},
});

test('should copy property descriptors from source to destination', t => {
	const destination = {};
	const source = {};

	Object.defineProperty(source, 'name', {
		value: 'AA',
	});

	t.false(Object.hasOwn(destination, 'name'));

	mergeDescriptors(destination, source);

	t.true(Object.hasOwn(destination, 'name'));
	t.deepEqual(Object.getOwnPropertyDescriptor(destination, 'name'), {
		value: 'AA',
		writable: false,
		enumerable: false,
		configurable: false,
	});
});

test('should redefine when configurable', t => {
	const destination = {};
	const source = {};

	Object.defineProperty(destination, 'name', {
		configurable: true,
		value: 'AA',
	});

	Object.defineProperty(source, 'name', {
		value: 'fido',
	});

	t.is(Object.getOwnPropertyDescriptor(destination, 'name').value, 'AA');
	t.is(Object.getOwnPropertyDescriptor(source, 'name').value, 'fido');

	mergeDescriptors(destination, source);

	t.is(Object.getOwnPropertyDescriptor(destination, 'name').value, 'fido');
});

test('should error when non-configurable', t => {
	const destination = {};
	const source = {};

	Object.defineProperty(destination, 'name', {
		configurable: false,
		value: 'AA',
	});

	Object.defineProperty(source, 'name', {
		value: 'fido',
	});

	t.throws(() => {
		mergeDescriptors(destination, source);
	}, {
		message: /Cannot redefine property: name/,
	});
});

test('should skip when overwrite is false', t => {
	const destination = {};
	const source = {};

	Object.defineProperty(destination, 'name', {
		configurable: true,
		value: 'AA',
	});

	Object.defineProperty(source, 'name', {
		value: 'fido',
	});

	mergeDescriptors(destination, source, false);

	t.is(Object.getOwnPropertyDescriptor(destination, 'name').value, 'AA');
});

test('should correctly copy getters and setters', t => {
	const destination = {};
	const source = {
		get name() {
			return 'John';
		},
		set name(value) {
			this._name = value;
		},
	};

	mergeDescriptors(destination, source);

	t.is(destination.name, 'John');
	destination.name = 'Jane';
	t.is(destination._name, 'Jane');
});

test('should merge multiple properties', t => {
	const destination = {age: 30};
	const source = {name: 'John', surname: 'Doe'};

	mergeDescriptors(destination, source);

	t.deepEqual(destination, {name: 'John', surname: 'Doe', age: 30});
});

test('should handle nested objects', t => {
	const destination = {};
	const source = {
		nested: {
			value: 42,
		},
	};

	mergeDescriptors(destination, source);

	t.is(destination.nested.value, 42);
});
