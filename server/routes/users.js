import express from 'express';
import validateInput from '../shared/validations/signup';
import bcrypt from 'bcrypt';

import  User from '../models/user';

let router = express.Router();



router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);
  //异步，Sign up disable isLoadding
  // setTimeout(()=>{
  // 	 if (!isValid) {
  // 	   res.status(400).json(errors);
  // 	 }
  // },3000)

	if (isValid) {
		// res.json({ success: true });
    const { username, password, timezone, email} = req.body;
    const password_digest = bcrypt.hashSync(password, 10);
    User.forge({
      username, timezone, email, password_digest
    },{ hasTimestamps:true}).save()
    .then(user => res.json({success:true}))
    .catch(err => res.status(500).json({error: err}));

	}else{
		res.status(400).json(errors);
	}
  
});

export default router;