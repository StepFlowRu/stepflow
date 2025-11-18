export interface UserConfig {
	root?: string;
	pagesPath?: string;
}

export function defineConfig(config: UserConfig): UserConfig;
