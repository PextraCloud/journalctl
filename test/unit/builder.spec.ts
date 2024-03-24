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
import {BuildJournalCommand} from '../../lib/builder';
import {describe, expect, it} from 'bun:test';
import {JournalOptions, MessagePriority} from '../../lib/types';

describe('BuildJournalCommand', () => {
	it('should build a basic command with no options', () => {
		const payload: JournalOptions = {};
		const result = BuildJournalCommand(payload);
		expect(result).toEqual(['--no-pager', '--output=json']);
	});

	it('should include options in the command', () => {
		const payload: JournalOptions = {
			options: {
				since: new Date('2023-01-01'),
				until: new Date('2023-01-02'),
				priority: MessagePriority.ERR,
			},
		};
		const result = BuildJournalCommand(payload);
		expect(result).toEqual([
			'--no-pager',
			'--output=json',
			"--since='2023-01-01 00:00:00'",
			"--until='2023-01-02 00:00:00'",
			"--priority='3'",
		]);
	});

	it('should handle options with no value', () => {
		const payload: JournalOptions = {
			options: {
				kernel: true,
				reverse: true,
			},
		};
		const result = BuildJournalCommand(payload);
		expect(result).toEqual(['--no-pager', '--output=json', '-k', '-r']);
	});

	it('should include a command and its argument', () => {
		const payload: JournalOptions = {
			command: {
				command: 'list-boots',
				argument: '1',
			},
		};
		const result = BuildJournalCommand(payload);
		expect(result).toEqual([
			'--no-pager',
			'--output=json',
			'list-boots',
			'1',
		]);
	});

	it('should throw an error for invalid options', () => {
		const payload: JournalOptions = {
			options: {
				// @ts-expect-error Testing invalid input
				invalidOption: 'value',
			},
		};
		expect(() => BuildJournalCommand(payload)).toThrow(
			'Invalid option: invalidOption'
		);
	});

	it('should include all options and a command', () => {
		const payload: JournalOptions = {
			options: {
				since: new Date('2023-01-01'),
				until: new Date('2023-01-02'),
				priority: MessagePriority.ERR,
				kernel: true,
				reverse: true,
				all: true,
				catalog: true,
				facility: 'syslog',
				grep: 'error',
				grepCaseSensitive: true,
				identifier: 'systemd',
				lines: 10,
				quiet: true,
				unit: 'systemd-journald.service',
				userUnit: 'systemd-journald.service',
				utc: true,
			},
			command: {
				command: 'list-boots',
				argument: '1',
			},
		};
		const result = BuildJournalCommand(payload);
		expect(result).toEqual([
			'--no-pager',
			'--output=json',
			"--since='2023-01-01 00:00:00'",
			"--until='2023-01-02 00:00:00'",
			"--priority='3'",
			'-k',
			'-r',
			'-a',
			'-x',
			"--facility='syslog'",
			"--grep='error'",
			"--case-sensitive='true'",
			"--identifier='systemd'",
			"--lines='10'",
			'-q',
			"--unit='systemd-journald.service'",
			"--user-unit='systemd-journald.service'",
			'--utc',
			'list-boots',
			'1',
		]);
	});
});
