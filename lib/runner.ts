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
import {BuildJournalCommand} from './builder';
import {JournalOptions, JournalEntry} from './types';
import {spawnSync} from 'child_process';

/**
 * Runs the journalctl command with the given options.
 */
const RunCommand = (payload: JournalOptions) => {
	const cmd = BuildJournalCommand(payload);
	const data = spawnSync('journalctl', cmd, {
		stdio: 'pipe',
		shell: true,
		encoding: 'utf-8',
	});

	if (data.error) {
		throw data.error;
	}

	const logs: Array<JournalEntry> = [];
	data.stdout.split('\n').forEach(line => {
		if (line.length > 0) {
			const parsed = JSON.parse(line);
			const entry: JournalEntry = {
				PRIORITY: parsed.PRIORITY,
				FACILITY: parsed.SYSLOG_FACILITY,
				IDENTIFIER: parsed.SYSLOG_IDENTIFIER,
				MESSAGE: parsed.MESSAGE,
				matches: Object.entries(parsed).reduce(
					(acc, [key, value]) => {
						if (key.startsWith('_')) {
							acc[key] = value as string;
						}

						return acc;
					},
					{} as Record<string, string>
				),
			};

			logs.push(entry);
		}
	});

	return logs;
};

export {RunCommand};
