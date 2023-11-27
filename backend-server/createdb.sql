-- DROP SCHEMA test;

CREATE SCHEMA test AUTHORIZATION postgres;
-- test.reciptids definition

-- Drop table

-- DROP TABLE test.reciptids;

CREATE TABLE test.reciptids (
	reciptid varchar NOT NULL,
	uid int4 NOT NULL
);


-- test.recipts definition

-- Drop table

-- DROP TABLE test.recipts;

CREATE TABLE test.recipts (
	reciptid varchar NOT NULL,
	item varchar NOT NULL,
	price varchar NOT NULL
);


-- test.users definition

-- Drop table

-- DROP TABLE test.users;

CREATE TABLE test.users (
	uid int4 NOT NULL,
	fullname varchar NOT NULL,
	address varchar NOT NULL
);