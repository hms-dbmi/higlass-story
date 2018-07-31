globalVars.typeOfChange = function (viewConf1, viewConf2, url) { 
    viewConf1 = JSON.parse(viewConf1);
    viewConf2 = JSON.parse(viewConf2);
    var diffsArr = odiff(viewConf1, viewConf2);
    var params = {};
    if(diffsArr.length === 0) {
        return ["none",params];
    }
    for(var i=0; i<diffsArr.length; i++) {
        if(diffsArr[i].path.length < 4 || (diffsArr[i].path[2] !== "initialXDomain" && diffsArr[i].path[2] !== "initialYDomain")) {
            params.url = url;
            for(var i=0; i<viewConf2.views.length; i++) {
                params[i] = [viewConf2.views[i].uid, viewConf2.views[i].initialXDomain[0], viewConf2.views[i].initialXDomain[1], 
                viewConf2.views[i].initialYDomain[0], viewConf2.views[i].initialYDomain[1]];
            }
            return ["reload", params];
        }
    }
    for(var i=0; i<viewConf2.views.length; i++) {
      params[i] = [viewConf2.views[i].uid, viewConf2.views[i].initialXDomain[0], viewConf2.views[i].initialXDomain[1], 
          viewConf2.views[i].initialYDomain[0], viewConf2.views[i].initialYDomain[1]];
    }
    return ["zoom",params];
}