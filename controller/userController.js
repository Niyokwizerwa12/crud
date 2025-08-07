import User from '../model/userModel.js'

export const create = async (req, res) => {
      
   try{
      const userData = new User(req.body)

      const {email} = userData
 
      const userExit = await User.findOne({email})
      if(!userExit){
        res.status(202).json({Message:"User already exists."})
      }

       
      const savedUser = await userData.save()
      res.status(200).json(savedUser)


   } catch(error){
        res.status(404).json({error:"fetch error"})
   }

}

export const fetch = async (req, res) => {
    try{
       const users = await User.find()
       if(users.length == 0){
        res.status(400).json({Message:"User not found."})

       }else{
             res.status(200).json(users)
       }
    
    }
    catch(error){
        res.status(404).json({error:"fetch error"})
    }
} 

export const update = async (req, res) => {

    try{
        
        const id = req.params.id

        const userExist = await User.findOne({_id:id})
        if(!userExist){

            return res.status(400).json({message:"User Not Found."})
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new:true
        })
        res.status(201).json(updateUser)

    } catch(error){
         res.status(404).json({Message:"User not found."})
    }

}

export const deleteUser = async (req, res) => {
       
      try{
        
        const id = req.params.id

        const userExist = await User.findOne({_id:id})
        if(!userExist){

            return res.status(404).json({message:"USer Not Found."})
        }
        await User.findByIdAndDelete(id)
        res.status(201).json({message:"User Has Been Deleted Successfull"})

    } catch(error){
         res.status(404).json({Message:"User not found."})
    }

}