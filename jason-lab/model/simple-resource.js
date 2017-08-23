'use strict';

const uuidv4 = require('uuid/v4');

const Character = module.exports = function(name, dead){
  if(!name) throw new Error('expected name');
  if(!dead) throw new Error('expected status');
  this.name = name;
  this.dead = dead;
  this.id = uuidv4();
};
