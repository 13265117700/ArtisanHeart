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
    this.setDefaultDatas();
    this.bind();
  },

  bind:function(){
    $('#messageborad-list').on('mousedown','.messageborad-item',this.handleMouseDown);
    $(window).on('mousemove',this.handleMouseMove);
    $(window).on('mouseup',this.handleMouseUp);
    $('.messageborad-editor-button').on('click',this.addItem);
    $('#messageborad-list').on('click','.messageborad-item-remove',this.removeItem);
    $(window).on('unload',this.saveTodos);
  },

  addItem:function(){
    let input = document.getElementsByClassName('input');
    let value = input[0].value.trim();
    if(input[0].value == ''){
      alert('请输入你的祝福语')
      return
    }
    PAGE.addCart(name='小兔说说: ',text=value);
    input[0].value = '';
  },

  removeItem:function(e){
    let item = e.target.parentNode;
    item.remove();
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

  setDefaultDatas:function(){
   PAGE.data.todos.forEach(data => PAGE.addCart(data.name,data.text))
  },

  addCart:function(name,text){
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
    let cardItem = `
      <div class="messageborad-item" style="${styleStr}">
        <p class="messageborad-item-name">${name}</p>
        <p class="messageborad-item-text">${text}</p>
        <img src="./image/index-messageborad-item-remove.png" class="messageborad-item-remove">
      </div>
    `
    $('#messageborad-list').append(cardItem);
  },

  randomBetween:function(min,max){
    return Math.floor(Math.random() * (max - min) + min);
  },
}

PAGE.init();