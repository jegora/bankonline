import { addUser, getAllUsers, getUser } from "../controllers/user-controller";
import { getAllDeposits, addDeposit, getAllUserDeposits } from "../controllers/deposit-controller";
import { getAllCredits, addCredit, getAllUserCredits } from "../controllers/credit-controller"

const routes = (app) => {
    app.route('/users')
        .get(getAllUsers)

    app.route('/user')
        .get(getUser)
        .post(addUser)

    app.route('/deposits')
        .get(getAllDeposits)

    app.route('/userDeposits')
        .get(getAllUserDeposits)
        .post(addDeposit)

    app.route('/credits')
        .get(getAllCredits)

    app.route('/userCredits')
        .get(getAllUserCredits)
        .post(addCredit)
}

export default routes