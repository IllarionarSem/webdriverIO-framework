class UserNavigationMenu {
    userMenuLink(linkText) {
        return $(`//span[text()="${linkText}"]`);
    }
}
export default new UserNavigationMenu();