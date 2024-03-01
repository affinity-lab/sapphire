let user: UserType | undefined = $state(undefined);

export type UserType = { id: number, name: string, avatar: string | undefined | null, roles?: string[] }

export const userStore = {
	get user() {return user;},
	set: (userToSet: UserType) => {user = userToSet},
	unset: () => {user = undefined;},
	hasRole: (role: undefined | string | string[]): boolean => {
		if (!user) return false;
		if (!role) return true;
		if (!user.roles) return false;
		if (typeof role === "string") role = [role];
		return user.roles.filter(value => role!.includes(value)).length > 0;
	}
};
