# journalctl

>A wrapper for systemd's journalctl written in TypeScript.

<br>

[![Downloads](https://badgen.net/npm/dt/@pextra/journalctl)](https://www.npmjs.com/package/@pextra/journalctl)
[![npm dependents](https://badgen.net/npm/dependents/@pextra/journalctl)](https://www.npmjs.com/package/@pextra/journalctl?activeTab=dependents)
[![Version](https://badgen.net/npm/v/@pextra/journalctl)](https://www.npmjs.com/package/@pextra/journalctl)
[![License](https://badgen.net/npm/license/@pextra/journalctl)](https://opensource.org/license/apache-2-0/)

## NOTICE

**This package is still in development and *is not* yet ready for production use. There *will* be breaking changes before the package is stable.**

Most commands are implemented, but a few are not yet. Not many of the command options are implemented yet, but the most common ones are.

**Please open an issue if you would like a specific option implemented.**

## Install

```sh
npm install @pextra/journalctl
```

## Usage

The library exports one synchronous function, `RetrieveJournal`, which is used to retrieve journal entries.

It takes one argument, which provides the journalctl command options in a typed manner.

It will return them in the following format:

```typescript
[
	{
		PRIORITY: MessagePriority;
		FACILITY?: SyslogFacility;
		IDENTIFIER: string;
		MESSAGE: string;
		matches: Record<string, string>;
	}
	// More entries...
]
```

Example:

```typescript
import {RetrieveJournal, JournalOptions} from '@pextra/journalctl';

const payload: JournalOptions = {
	options: {
		kernel: true,
		reverse: true,
	},
};

const entries = RetrieveJournal(payload); // Array<JournalEntry>
// Built command: `journalctl --no-pager --output=json -k -r`

console.log(entries); // Journal entries
```

See [lib/types/index.ts](./lib/types/index.ts) for types.

## Support/Contact

For enterprise licensing, support, and consulting, please visit [our website](https://pextra.cloud/enterprise). Alternatively, you can contact us at [enterprise@pextra.cloud](mailto:support@pextra.cloud).

If you have any questions, please feel free open an issue or a discussion. You can also contact us at [support@pextra.cloud](mailto:support@pextra.cloud).

## Contributions

We welcome contributions! If you find any bugs, have feature requests, or would like to contribute enhancements, please feel free to open issues or submit pull requests.

We use [gts](https://github.com/google/gts) for linting and formatting.

## License

journalctl is licensed under the [Apache 2.0 License](./LICENSE).
