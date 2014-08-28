var fs = require('fs')
  , path = require('path')

  , debug = require('debug')('backend')
  , Router = require('koa-router')
  , Resource = require('koa-resource-router')
  , readDir = require('readdir')
  , noop = require('koa-noop')
  , is = require('jistype')
  , _ = require('lodash')

  , resourceDict = {}

  ;

module.exports = function(app, dir, suffix){
  debug('start dispath');
  suffix =  suffix || 'resource';
  var dirPath = path.resolve(dir);

  dispathPath(app, dirPath, suffix);
  dispathResource(app, dirPath, suffix);

  return noop;
}

function dispathPath(app, dirPath, suffix){
  debug('dispath path: ' + dirPath);
  var fileSuffixRegex = new RegExp('\\.' + suffix + '\\.js$')
    , dirSuffixRegex = new RegExp('\\.' + suffix + '$')

  if(!fs.existsSync(dirPath)){
    return;
  }

  readDir.readSync(dirPath, ['*.js', '*/'], readDir.INCLUDE_DIRECTORIES + readDir.ABSOLUTE_PATHS).forEach(function(filePath){
    filePath = filePath.replace(/\/$/, '');
    if(filePath.match(fileSuffixRegex)){
      return;
    }
    if(filePath.match(dirSuffixRegex)){
      return;
    }
    var path = getPath(filePath);
    app.use(path.middleware());
  });
}
function getPath(filePath){
  var pathObj = require(filePath)
    , route = new Router()
    ;

  Object.keys(pathObj).forEach(function(key){
    var args = pathObj[key]
      , methodPath = key.split(' ')
      , methodStr = methodPath[0].toUpperCase()
      , path = methodPath[1]
      , methods = methodStr.split(',')
      ;

    if(is.isArray(args)){
      args.unshift(path);
    }else{
      args = [path, args];
    }

    methods.forEach(function(method){
      switch(method){
        case 'GET':
          route.get.apply(route, args);
          break;
        case 'POST':
          route.post.apply(route, args);
          break;
        case 'PUT':
          route.put.apply(route, args);
          break;
        case 'DELETE':
          route.delete.apply(route, args);
          break;
        case 'ALL':
          route.get.apply(route, args);
          route.post.apply(route, args);
          route.put.apply(route, args);
          route.delete.apply(route, args);
          break;
        default:
          throw new Error('Invalid HTTP method specified for route ' + path);
          process.exit(1);
      }
    });
  });

  return route;
}

function dispathResource(app, dirPath, suffix){
  debug('dispath resource: '  + dirPath);
  var fileSuffix = '.' + suffix + '.js'
    , dirSuffix = '.' + suffix
    ;

  if(!fs.existsSync(dirPath)){
    return;
  }

  readDir.readSync(dirPath, ['**' + fileSuffix], readDir.ABSOLUTE_PATHS).forEach(function(filePath){
    var resource = getResource(filePath, suffix, dirPath);
    if(!resource.private){
      app.use(resource.middleware());
    }
  });
}
function getResource(filePath, suffix, resourcesDir){

  if(resourceDict.hasOwnProperty(filePath)){
    return resourceDict[filePath];
  }

  var fileSuffix = '.' + suffix + '.js'
    , dirSuffixRegex = new RegExp('\\.' + suffix + '$')

    , resourcePath = filePath
    , resourceName
    , resourceDir
    , resource

    , resourceRelative
    , resourceChain

    , parentResourcePath
    , parentResourceName
    , parentResourceDir
    , parentResource

    , resourceObj
    , private
    , args

    , option

    ;

  resourceName = path.basename(resourcePath, fileSuffix);
  resourceDir = path.dirname(resourcePath);

  resourceRelative = path.relative(resourcesDir, resourceDir);

  if(resourceRelative){
    resourceChain = resourceRelative.split(path.sep);

    parentResourceName = resourceChain.pop().replace(dirSuffixRegex, '');
    parentResourceDir = path.join(resourcesDir, resourceChain.join(path.sep));
    parentResourcePath = path.join(parentResourceDir, parentResourceName + fileSuffix);

    parentResource = getResource(parentResourcePath, suffix, resourcesDir);
  }

  args = require(resourcePath);

  if(is.isObject(args)){
    args = [args];
  }

  if (is.isString(args[args.length - 1])) {
    // define option name
    resourceName = args.pop();
  }

  // the last one is our defined object.
  resourceObj = args[args.length - 1];

  if(resourceObj.option){
    option = resourceObj.option;
    delete resourceObj.option;
    args.push(option);
  }


  if (resourceObj.private) {
    private = true;
    delete resourceObj.private;
  }

  resource = createResource(_.flatten([resourceName, args]));

  if (private) {
    resource.private = true;
  }

  debug('parentResourceName: ' + parentResourceName);
  debug('resourceName: ' + resourceName);
  if (parentResource) {
    parentResource.add(resource);
  }

  resourceDict[resourcePath] = resource;

  return resource;
}
function createResource(args) {
  function R() {
    return Resource.apply(this, args);
  }
  R.prototype = Resource.prototype;
  return new R();
}
