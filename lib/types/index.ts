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
export enum MessagePriority {
	EMERG = 0,
	ALERT = 1,
	CRIT = 2,
	ERR = 3,
	WARNING = 4,
	NOTICE = 5,
	INFO = 6,
	DEBUG = 7,
}

export type SyslogFacility =
	| 'kern'
	| 'user'
	| 'mail'
	| 'daemon'
	| 'auth'
	| 'syslog'
	| 'lpr'
	| 'news'
	| 'uucp'
	| 'cron'
	| 'authpriv'
	| 'ftp'
	| 'local0'
	| 'local1'
	| 'local2'
	| 'local3'
	| 'local4'
	| 'local5'
	| 'local6'
	| 'local7';

export type JournalCommand =
	| 'fields'
	| 'field'
	| 'list-boots'
	| 'disk-usage'
	| 'vacuum-size'
	| 'vacuum-time'
	| 'vacuum-files'
	| 'verify'
	| 'sync'
	| 'relinquish-var'
	| 'smart-relinquish-var'
	| 'flush'
	| 'rotate'
	| 'header'
	| 'list-catalog'
	| 'dump-catalog'
	| 'update-catalog'
	| 'setup-keys'
	| 'help'
	| 'version';

// Mapping between the command and the string to pass to journalctl
export const JournalOptionsMap: Record<string, string> = {
	since: 'since',
	until: 'until',
	unit: 'unit',
	userUnit: 'user-unit',
	identifier: 'identifier',
	priority: 'priority',
	facility: 'facility',
	grep: 'grep',
	grepCaseSensitive: 'case-sensitive',
	kernel: 'k',
	lines: 'lines',
	reverse: 'r',
	utc: 'utc',
	catalog: 'x',
	all: 'a',
	quiet: 'q',
};

/**
 * Options that do not have a value.
 */
export const JournalOptionNoValueMap: Array<string> = [
	'kernel',
	'reverse',
	'utc',
	'catalog',
	'all',
	'quiet',
];

/**
 * Options for calling journalctl.
 */
export interface JournalOptions {
	/** Options for calling journalctl. */
	options?: {
		/** Show entries since the specified date. */
		since?: Date;

		/** Show entries until the specified date. */
		until?: Date;

		/** Show entries from the specified systemd unit. */
		unit?: string;

		/** Show entries from the specified systemd user unit. */
		userUnit?: string;

		/** Show entries from the specified syslog identifier. */
		identifier?: string;

		/** Show entries from the specified message priority. */
		priority?: MessagePriority;

		/** Show entries from the specified syslog facility. */
		facility?: SyslogFacility | string;

		/** Filter output to entries matching he specific pattern. */
		grep?: RegExp | string;
		/** Use case-sensitive matching (only relevant if grep is set). */
		grepCaseSensitive?: boolean;

		/** Show only kernel messages (dmesg). */
		kernel?: boolean;

		/** Number of journal entries to show. */
		lines?: number;

		/** Show newest entries first. */
		reverse?: boolean;

		/** Show timestamps in UTC. */
		utc?: boolean;

		/** Show explanation texts from the message catalog along with the messages. */
		catalog?: boolean;

		/** Show all fields in full, including long and unprintable fields. */
		all?: boolean;

		/** Refrain from showing informational/warning messages from journalctl itself. */
		quiet?: boolean;
	};

	/** The command to run. */
	command?: {
		/** The command to run. */
		command: JournalCommand;

		/** Argument to pass to the command. */
		argument?: string;
	};
}

/**
 * A log entry from the journal.
 */
export interface JournalEntry {
	/** The message priority. */
	PRIORITY: MessagePriority;

	/** The syslog facility. */
	FACILITY?: SyslogFacility;

	/** The syslog identifier. */
	IDENTIFIER: string;

	/** The message. */
	MESSAGE: string;

	/** Journal match fields. */
	matches?: Record<string, string>;
}
