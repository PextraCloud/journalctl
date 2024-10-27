import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'lib/index.ts',
	output: [
		{
			file: 'dist/index.js',
			format: 'es',
			sourcemap: true,
		},
	],
	plugins: [
		resolve(),
		typescript({tsconfig: './tsconfig.build.json'}),
		terser(),
	],
	external: [],
};
