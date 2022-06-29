declare function setConfig(newConfigs: configType): void;
declare function readConfig(): configType & stableConfigType;
declare function setLoggedUser(user: SingUserInfo): void;
declare function readLoggedUser(): SingUserInfo;
export { setConfig, readConfig, setLoggedUser, readLoggedUser };
