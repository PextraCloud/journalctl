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
import {
	JournalOptions,
	JournalOptionsMap,
	JournalOptionNoValueMap,
} from './types';

const BASE_ARGS = ['--no-pager', '--output=json'];

const processDate = (date: Date) =>
	date.toISOString().split('T').join(' ').split('.')[0];

/**
 * Build the command and arguments for journalctl.
 */
const BuildJournalCommand = (payload: JournalOptions) => {
	const args: Array<string> = [...BASE_ARGS];

	if (payload.options) {
		Object.entries(payload.options).forEach(([option, value]) => {
			const mapped = JournalOptionsMap[option];
			if (mapped) {
				if (option === 'since' || option === 'until') {
					args.push(`--${mapped}='${processDate(value as Date)}'`);
					return;
				}

				if (JournalOptionNoValueMap.includes(option)) {
					args.push(`-${mapped.length === 1 ? '' : '-'}${mapped}`);
				} else {
					const escaped = value.toString().replace(/'/g, "\\'");
					args.push(`--${mapped}='${escaped}'`);
				}
			} else {
				throw new Error(`Invalid option: ${option}`);
			}
		});
	}

	if (payload.command) {
		args.push(payload.command.command);

		if (payload.command.argument) {
			args.push(payload.command.argument);
		}
	}

	return args;
};

export {BuildJournalCommand};
