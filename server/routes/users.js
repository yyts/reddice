import express from 'express';
import validateInput from '../shared/validations/signup';

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
		res.json({ success: true });
	}else{
		res.status(400).json(errors);
	}
  
});

export default router;