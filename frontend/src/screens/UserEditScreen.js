import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register, getUserDetails, editUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({match}) => {
 
    const params = useParams()
    const userId= params.id
    const navigate = useNavigate();
    const location = useLocation();
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    const dispatch = useDispatch()
    
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error,user } = userDetails;
    
    const userEdit = useSelector((state) => state.userEdit);
    const { loading:loadingEdit, error:errorEdit, success:successEdit} = userEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({type: USER_UPDATE_RESET });
            navigate(`/admin/userList`);
        }
        else {
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
            }
            else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, navigate, successEdit, user._id, user.email, user.isAdmin, user.name, userId])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editUser({_id:userId, name, email, isAdmin}))
    }
    
    return (
        <>
        <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
        <h1>Edit User</h1>
        {loadingEdit && <Loader />}
        {errorEdit && <Message variant={'danger'}>{errorEdit}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: (
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                </Form.Group>
        
                <Form.Group controlId='isadmin'>
                <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
                </Form.Group>
        
                <Button type='submit' variant='primary'>
                Update
                </Button>
            </Form>
        )}
        
    
        </FormContainer>
        </>
        
    )
}
 
export default UserEditScreen