const express = require("express");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
//creating account router
const accountRouter = express.Router();
const mongoose = require('mongoose');

// 1. Endpoint for user to get the balance
accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  return res.json({
    balance: account.balance,
  });
  
});

// 2. Endpoint to transfer amounts ->  Without using the transactions DB
// accountRouter.post("/transfer", async (req, res) => {
//   //without the transaction soln
//   const { amount, to } = req.body();
//   const account = Account.findOne({
//     userId: req.userId,
//   });
//   if (account.balance < amount) {
//     return res.status(400).json({
//       message: "Insufficient Balance",
//     });
//   }
//   const toAccount = await Account.findOne({
//     userId: to,
//   });
//   if (!toAccount) {
//     return res.status(400).json({
//       message: "Provide the right to id",
//     });
//   }
//   await Account.updateOne(
//     {
//       userId: req.userId,
//     },
//     {
//       $inc: {
//         balance: -amount,
//       },
//     }
//   );
//   await Account.updateOne(
//     {
//       userId: to,
//     },
//     {
//       $inc: {
//         balance: amount,
//       },
//     }
//   );
//   res.json({
//     message: "Transfer is successful"
//   })
// });

// 2. Endpoint to Transfer Amounts -> Using the Transactions in DB
accountRouter.post("/transfer" ,authMiddleware ,  async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction() ;
    const {amount , to} = req.body ; 
    const account = await Account.findOne({
        userId: req.userId 
    }).session(session)
    if(!account || account.balance < amount){
        //abort the transaction 
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    const toAccount = await Account.findOne({
        userId: to
    }).session(session)
    if(!toAccount){
        await session.abortTransaction() ; 
        return res.status(400).json({
            message: "Invalid Account"
        })
    }
    //Everything works fine, do the transaction => transfer
    await Account.findOneAndUpdate({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    
    await Account.findOneAndUpdate({ userId: to }, { $inc: { balance: amount } }).session(session);
    
    //Committing the session ( expecting no rollback)
    await session.commitTransaction();
    
    res.json({
        message: "Transfer successful",
    });
}) 

module.exports = accountRouter;
