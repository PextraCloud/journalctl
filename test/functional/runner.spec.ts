/*
 Copyright 2024 Pextra Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import {RunCommand} from '../../lib/runner';
import {describe, expect, it} from 'bun:test';
import {JournalEntry, JournalOptions} from '../../lib/types';

const validateResult = (result: Array<JournalEntry>) => {
	expect(result).toBeInstanceOf(Array);
	expect(result.length).toBeGreaterThan(0);
	result.forEach(entry => {
		expect(entry).toBeObject();
		expect(entry.PRIORITY).toBeString();
		expect(
			typeof entry.FACILITY === 'string' || entry.FACILITY === undefined
		).toBeTrue();

		Object.entries(entry.matches || {}).forEach(([key, value]) => {
			expect(key).toMatch(/^_/);
			expect(value).toBeString();
		});
	});
};

describe('RunCommandSync', () => {
	it('should run a basic command', () => {
		const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
		const payload: JournalOptions = {
			options: {
				since: yesterday,
			},
		};

		const result = RunCommand(payload);
		validateResult(result);
	});

	it('should run a basic command with a specified number of lines', () => {
		const payload: JournalOptions = {
			options: {
				lines: 5,
			},
		};

		const result = RunCommand(payload);
		validateResult(result);
		expect(result.length).toBeLessThanOrEqual(5);
	});
});
