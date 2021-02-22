(function() {
    Element.prototype._addEventListener = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function(a,b,c) {
      if(c==undefined)
        c=false;
      this._addEventListener(a,b,c);
      if(!this.eventListenerList)
        this.eventListenerList = {};
      if(!this.eventListenerList[a])
        this.eventListenerList[a] = [];
      //this.removeEventListener(a,b,c); // TODO - handle duplicates..
      this.eventListenerList[a].push({listener:b,useCapture:c});
};
  
Element.prototype.getEventListeners = function(a){
      if(!this.eventListenerList)
        this.eventListenerList = {};
      if(a==undefined)
        return this.eventListenerList;
      return this.eventListenerList[a];
};

Element.prototype.clearEventListeners = function(a){
      if(!this.eventListenerList)
        this.eventListenerList = {};
      if(a==undefined){
        for(var x in (this.getEventListeners())) this.clearEventListeners(x);
          return;
      }
      var el = this.getEventListeners(a);
      if(el==undefined)
        return;
      for(var i = el.length - 1; i >= 0; --i) {
        var ev = el[i];
        this.removeEventListener(a, ev.listener, ev.useCapture);
      }
};
  
Element.prototype._removeEventListener = Element.prototype.removeEventListener;
Element.prototype.removeEventListener = function(a,b,c) {
      if(c==undefined)
        c=false;
      this._removeEventListener(a,b,c);
        if(!this.eventListenerList)
          this.eventListenerList = {};
        if(!this.eventListenerList[a])
          this.eventListenerList[a] = [];
  
        // Find the event in the list
        for(var i=0;i<this.eventListenerList[a].length;i++){
            if(this.eventListenerList[a][i].listener==b, this.eventListenerList[a][i].useCapture==c){ // Hmm..
                this.eventListenerList[a].splice(i, 1);
                break;
            }
        }
      if(this.eventListenerList[a].length==0)
        delete this.eventListenerList[a];
    };
})();


/*******************************************************************************************************************************************/
// elemento.getEventListeners([name]) - lista de eventListeners
// elemento.clearEventListeners([name]) - Borrado de todos los eventlistener

function alerta1() {
   alert("Tengo el foco")
}

function alerta2() {
    alert("Pulsada tecla")
}

caja1=document.getElementById("caja1");
caja1.addEventListener('focus',alerta1)
caja1.addEventListener('keydown',alerta2)

console.log(caja1.eventListenerList)