import express from 'express';
import {deleteById, findById, findUserByIdPassword, registerUser, updateUserById} from '../repository/users.js';
import {createAddress, deleteAddressById, findAddress, findAddressById, updateAddressById} from '../repository/address.js';
import {validation} from '../validation/signup.js';
import jwt from 'jsonwebtoken';

//연결
const router = express.Router();

const secretKey = 'addressBook';
const expireOption = {algorithm: 'HS256', expiresIn: '30m', issuer: 'parkgeunwon'};


router.route('/api/users')
    .post(async (req, res) => {
        const validateUser = await validation(req.body);
        if (validateUser.username && validateUser.password && validateUser.id) {
            const newUser = await registerUser(validateUser);
            res.send(newUser);
        }
    });

router.route('/api/users/signin')
    .post(async (req, res) => {
        if (req.body.id && req.body.password) {
            const compareUser = await findUserByIdPassword(req.body.id, req.body.password);
            console.log(compareUser);
            if (req.body.id === compareUser.id && req.body.password === compareUser.password)
                jwt.sign(
                    {id: req.body.id},
                    secretKey,
                    expireOption,
                    (err, token) => {
                        res.status(200).send(token);
                    });
        } else {
            res.status(401).send('sign in failed!');
        }
    });


router.route('/api/users/:id')
    .get(async (req, res) => {
        const result = await findById(req.params.id);
        res.send(result);
    })
    .delete(async (req, res) => {
        const verified = verifyUser(req.header('Authorization'));
        console.log(verified);
        const deletedUser = await deleteById(req.params.id);
        console.log(deletedUser, '성공');
        res.send('삭제됨');
    })
    .patch(async (req, res) => {
        const patchUser = await updateUserById(req.params.id, req.body.username);
        console.log(patchUser);
        console.log('이름이 수정되었습니다.');
        res.send('성공');
    });


router.route('/contacts')

    .post(async (req, res) => {
        try {
            verifyUser(req.header('Authorization'));
        } catch (err) {
            res.status(401).send(err);
        }
        const newAddress = await createAddress(req.body);
        res.send(newAddress).status(200);
    })
    .get(async (req, res) => {
        try {
            verifyUser(req.header('Authorization'));
        } catch (err) {
            res.status(401).send(err);
        }
        const result = await findAddress();
        res.send(result).status(200);
    });

router.route('/contacts/:id')

    .delete(async (req, res) => {
        try {
            verifyUser(req.header('Authorization'));
        } catch (err) {
            res.status(401).send(err);
        }
        const result = await deleteAddressById(req.params.id);
        res.send(result).status(200);
    })

    .patch(async (req, res) => {
        try {
            verifyUser(req.header('Authorization'));
        } catch (err) {
            res.status(401).send(err);
        };
        const result = await updateAddressById(req.params.id, req.body.address);
        res.send(result).status(200);
    })
    .get(async (req, res) => {
        try {
            verifyUser(req.header('Authorization'));
        } catch (err) {
            res.status(401).send(err);
        }
        const result = await findAddressById(req.params.id);
        res.send(result).status(200);
    });

function verifyUser(token) {
    return jwt.verify(token, secretKey);
}

export default router;