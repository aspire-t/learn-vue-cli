const { semver, execa } = require('@vue/cli-shared-utils')
const { executeCommand } = require('./util/executeCommand')

const PACKAGE_MANAGER_CONFIG = {
	npm: {
		install: ['install', '--loglevel', 'error']
	}
}

class PackageManager {
	constructor({ context } = {}) {
		this.context = context || process.cwd()
		this.bin = 'npm'
		this._registries = {}

		// npm 版本处理
		const MIN_SUPPORTED_NPM_VERSION = '6.9.0'
		const npmVersion = execa.sync('npm', ['--version']).stdout

		// 查看用户 NPM 的版本，小于 6.9.0，提醒用户升级并退出
		if (semver.lt(npmVersion, MIN_SUPPORTED_NPM_VERSION)) {
			throw new Error('NPM 版本太低啦，请升级')
		}

		// NPM 版本大于 7.0.0 ，命令添加--legacy - peer - deps参数。
		if (semver.gte(npmVersion, '7.0.0')) {
			this.needsPeerDepsFix = true
		}
	}

	// 安装
	async install () {
		const args = []

		// npm 版本大于7
		if (this.needsPeerDepsFix) {
			args.push('--legacy-peer-deps')
		}

		return await this.runCommand('install', args)
	}

	async runCommand (command, args) {
		await executeCommand(
			this.bin,
			[
				...PACKAGE_MANAGER_CONFIG[this.bin][command],
				...(args || [])
			],
			this.context
		)
	}
}

module.exports = PackageManager
