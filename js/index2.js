let backgoundColors = ['#D5D6EA','#DCEBD7','#EAE7D5','#EBD7D7','#F0F5FF'];

const PAGE = {
  data:
    {
      backgoundColors:backgoundColors,
      itemWidth:320,
      itemHeight:190,
      paddingOffset:0,
      zIndex:0,
      item:null,
      itemOffsetTop:null,
      itemOffsetLeft:null,
      pageX:null,
      pageY:null,
      isLock:true,
      todos:[{
        name:'小兔说说: ',
        text:'宇老师你好',
      }]
    },
  init:function(){
    this.bind();
    this.getTodos();
  },

  bind:function(){
    $('#messageborad-list').on('mousedown','.messageborad-item',this.handleMouseDown);
    $(window).on('mousemove',this.handleMouseMove);
    $(window).on('mouseup',this.handleMouseUp);
    $('.messageborad-editor-button').on('click',this.addItem);
    $('#messageborad-list').on('click','.messageborad-item-remove',this.removeItem);
    $(window).on('unload',this.saveTodos);
  },

  getTodos:function(){
    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos) || [];
    PAGE.data.todos = todos;
    this.addCart();
  },

  saveTodos:function(){
    let todos = PAGE.data.todos;
    let todosStr = JSON.stringify(todos);
    localStorage.setItem('todos',todosStr);
  },

  addItem:function(){
    let input = $('.input');
    let value = input[0].value.trim();
    if(!value){
      alert('请输入你的祝福语')
      return
    }
    PAGE.data.todos.push({
      name:'小兔说说: ',
      text:value,
    })
    PAGE.addCart();
    input[0].value = '';
  },

  removeItem:function(){
    let todos = PAGE.data.todos;
    let index = $(this).parent().data('index');
    todos.splice(index,1);
    PAGE.addCart();
  },

  handleMouseDown:function(e){
    let item = this;
    item.style.zIndex = ++PAGE.data.zIndex;
    PAGE.data.itemOffsetTop = item.offsetTop;
    PAGE.data.itemOffsetLeft = item.offsetLeft;
    PAGE.data.pageX = e.pageX;
    PAGE.data.pageY = e.pageY;
    PAGE.data.item = item;
    PAGE.data.isLock = false;
  },

  handleMouseMove:function(e){
    e.preventDefault();
    if(!PAGE.data.isLock){
      let cardList = document.getElementById('messageborad-list');
      let ListWidth = cardList.offsetWidth;
      let ListHeight = cardList.offsetHeight;
      let itemWidth = PAGE.data.itemWidth;
      let itemHeight = PAGE.data.itemHeight;
      let paddingOffset = PAGE.data.paddingOffset;
      let maxWidth = ListWidth - itemWidth - paddingOffset;
      let maxHeight = ListHeight - itemHeight - paddingOffset;
      let translateX = e.pageX - PAGE.data.pageX + PAGE.data.itemOffsetLeft;
      let translateY = e.pageY - PAGE.data.pageY + PAGE.data.itemOffsetTop;
      translateX = translateX > maxWidth? maxWidth : translateX;
      translateY = translateY > maxHeight? maxHeight : translateY;
      translateX = translateX < paddingOffset? paddingOffset : translateX;
      translateY = translateY < paddingOffset? paddingOffset : translateY;
      PAGE.data.item.style.left = translateX + 'px';
      PAGE.data.item.style.top = translateY + 'px';
    }
  },

  handleMouseUp:function(){
    PAGE.data.isLock = true
  },

  addCart:function(){
    let cardItem = PAGE.data.todos.map((data,index)=>{
      let cardList = document.getElementById('messageborad-list');
      let ListWidth = cardList.offsetWidth;
      let ListHeight = cardList.offsetHeight;
      let itemWidth = PAGE.data.itemWidth;
      let itemHeight = PAGE.data.itemHeight;
      let paddingOffset = PAGE.data.paddingOffset;
      let maxWidth = ListWidth - itemWidth - paddingOffset;
      let maxHeight = ListHeight - itemHeight - paddingOffset;
      let randomTop = PAGE.randomBetween(paddingOffset,maxHeight);
      let randomLeft = PAGE.randomBetween(paddingOffset,maxWidth);
      let zIndex = ++ PAGE.data.zIndex ;
      let backgoundColors = PAGE.data.backgoundColors;
      let backgoundColor = backgoundColors[zIndex%backgoundColors.length];
      let styleStr = `
      z-index:${zIndex};
      background:${backgoundColor};
      top:${randomTop}px;
      left:${randomLeft}px;
      `;
      return `
        <div class="messageborad-item" style="${styleStr}" data-index="${index}">
          <p class="messageborad-item-name">${data.name}</p>
          <p class="messageborad-item-text">${data.text}</p>
          <img src="./image/index-messageborad-item-remove.png" class="messageborad-item-remove">
        </div>
      `
    }).join('');
    $('#messageborad-list').html(cardItem);
  },

  randomBetween:function(min,max){
    return Math.floor(Math.random() * (max - min) + min);
  },
}

PAGE.init();