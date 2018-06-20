const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')

let models = require('./models')

app.engine('mustache',mustacheExpress())
app.use(bodyParser.urlencoded({extended : false}))
app.use(express.static('public'))

app.set('views','./views')
app.set('view engine','mustache')

app.get('/',function(req,res){
  res.render('shoppingLists')
})


app.get('/shoppingLists',function(req,res){


  models.ShoppingList.findAll().then(function(list){

    res.render('shoppingLists',{'shoppinglists' : list})
  })
})

/*
app.get('/shoppingLists/:name',function(req,res){

  models.ShoppingList.findOne({
    where: {
      name : req.params.name
    }
  }).then(function(){

    res.redirect('shoppingLists/'+name+'')
  })
})
*/
app.post('/addShoppingList',function(req,res){

  let shoppingList = {
    name : req.body.name,
    street : req.body.street,
    city : req.body.city,
    state : req.body.state,
    id : req.body.id

  }

  models.ShoppingList.create(shoppingList).then(function(){
    res.redirect('shoppingLists')
  })
})

app.post('/deleteShoppingList',function(req,res){

  let shoppingListId = req.body.shoppingListId

  models.ShoppingList.findOne({
    where : {
      id : shoppingListId
    }
  }).then(function(list){
    return list.destroy()
  }).then(function(){
    res.redirect('shoppingLists')
  })


})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
