export const redirectByrole = (role) => {
    switch(role) {
        case "Employee":
        return("/employee/dashboard");
        break;
        case "Manager":
        return("/manager/dashboard");
        break;
        case "Finance":
        return("/finance/dashboard");
        break;
        default:
        return("/");
    }
}