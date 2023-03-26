import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, editUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

//@desc Auth users & get toket
//@route POST /api/users/login
//@access public

router.post('/login', authUser)
router.route('/').post(registerUser).get(protect, admin, getUsers)
// router.post('/', registerUser).get(protect, getUsers)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,editUser);

export default router