 // registro
 Vue.component('side_grupos', {
    template: '<div class="nav-side-menu">'+
                '<ul>'+
                  '<li v-for="(grupo, index) in grupos">'+
                      '{{ grupo.nombre }}'+
                  '</li>'+                    
                '</ul>'+
                '<input '+
                'v-model="newGrpText" '+
                'v-on:keyup.enter="addGrp" '+
                'placeholder="Nombre del Grupo" '+
                '>'+
              '</div>',
    data:function(){
      return {
        newGrpText:'',
        grupos:[
          {nombre:'uno'},
          {nombre:'dos'},
          {nombre:'tres'}
          ]
      }
    },
    methods: {
        addGrp: function () {
        this.grupos.push(newGrpText(this.newGrpText));
        this.newGrpText = '';
      }
    }
  })
  //contexto (alcance)
  new Vue({
    el: '#side_grupos'      
  })
  function newGrpText(nombre){
     // alert(nombre);
     //enviarlo al API de grupos
    return {nombre:nombre}
  }