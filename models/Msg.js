



const MSG = sequelize.define('MSG', {
  message: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  // Other model options go here
});
module.exports=MSG
