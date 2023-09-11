const LitElement = Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class ChineseCalendarCard extends LitElement {
  static getStubConfig() {
    return {
	"text": '',
    };
  }

  static get styles() {

    return css`
        :host {
          --main-bg-color: none /* 设置上半部分container背景颜色为none */
          --main-title-color: white;
          --ch-highlight-color: #03a9f4;
          --cell-title-color: white; /* 设置下半部分list的左边文字颜色为白色 */
          --cell-date-color: #aaa;
        }
        .icon_container {
          width: 40px; /*设置下半部分倒计数字日期的数字与下文的空隙,从40到8 */
        }
        .icon {
          width: 28px; /*设置下半部分左侧图标大小,从25到28 */
          height: 28px; /*设置下半部分左侧图标大小,从25到28 */
          display: inline-block;
          vertical-align: middle;
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          text-indent: -9999px;
          margin-left: 10px;
        }
        .icon_state {
          width: 20px;
          height: 20px;
          display: inline-block;
          vertical-align: middle;
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          text-indent: -9999px;
          margin-left: 10px;
        }        
        .card {
          padding: 0 18px 18px 18px; /* 设置,从18到8 */
        }
        .header div {
          display: flex;
        }
        .title {
          margin-left: 16px;
          font-size: 16px;
        }

        .flex_container_center {
          display: flex;
          align-items: baseline;
          justify-content: center;
        }        

        .date_solar {
          font-size: 28px; /* 设置上半部分阳历日期的字体大小, 从30到28 */
          text-align: right;
          color: white;
          margin-right: 18px;
          margin-top: 18px;
        }
        .date_week {
          font-size: 18px;
          color: white;
          text-align: right;
          margin-right: 18px;
          margin-top: -18px;
        }
        .date_lunar {
          font-size: 14px;
          color: white;
          text-align: right;
          margin-right: 18px;
          margin-top: -18px;
         }
        .date_text {
          font-size: 16px;
          color: var(--main-title-color);
          margin-right: 20px;
          margin-left: 20px;
          margin-top: 20px;
        }
        .date_pdtime {
          font-size: 36px;
          color: var(--main-title-color);
          margin-right: 20px;
          text-align: center;
          margin-left: 20px;
          padding-top: 30px;
        } 
               
        .latest_title {
          color: white;
          font-size: 14px;
          text-align: center;
          padding-top: 8px; /* 设置距离两字与上面信息之间的空隙,从35到28 */
        }
        .latest_holiday {
          color: white;
          font-size: 18px;
          text-align: center;
          padding-top: 4px; /* new */
        }
        .latest_days {
          color: var(--ch-highlight-color); /* 设置上半部分倒计数字天数的颜色, 为用下面列表数字一样的浅蓝色,原来是白色的 */
          text-align: center;
          padding-top: 18px; /* 设置上半部分倒计数字天数的颜色与上文案间隙, 从20到18 */
          padding-bottom: 0px; /* 设置上半部分倒计数字天数的颜色与下文案间隙 */
        }
        .days-number {
          font-size: 68px; /* 设置上半部分倒计数字天数的字体大小 */
          font-weight: bold;
          display: bold;
        }        
        .days-text {
          font-size: 12px; /* 设置上半部分倒计数字天数的天字的字体大小 */
          color: white;
        }      
        
        .latest_date {
          color: white;
          font-size: 16px; /* 设置上半部分倒计数字日期的数字字体大小 */
          text-align: center;
          padding-bottom: 0px; /* 设置上半部分倒计数字日期的数字与下文的空隙 */
        }
        .cell_l {
          text-align: left;
        }
        .cell_name {
          font-size: 16px;
          color: white

        }
        .cell_date {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7); /* 设置为白色的70%透明度,0代表完全透明 */

        }
        .cell_day_h {
          text-align: right;
          padding-right: 12px;
          font-size: 16px;
          color: var(--ch-highlight-color);
        }
        .cell_day_n {
          text-align: right;
          padding-right: 12px;
          font-size: 16px;
          color: var(--cell-title-color);          
        }
        .table {
          width: 100%;
          padding-right: 18px; /* 设置下半部分倒计数字日期的数字与下文的空隙,从20到8 */
          padding-top: 8px; /* 设置下半部分倒计数字日期的数字与下文的空隙,从12到8 */
          padding-bottom: 6px; /* 设置下半部分倒计数字日期的数字与下文的空隙,从6到8 */
          padding: 1px;
        }
        .container {
          background: var(--main-bg-color);
          border-top-left-radius: 8px; /* new */
          border-top-right-radius: 8px;  /* new */
        }
        .list_container {
          padding-bottom: 8px; /* 设置下半部分倒计数字日期的数字与下文的空隙,从20到8 */
        }
        .clock {
          margin-left: 18px;
          font-size: 58px;
          color: white;
          text-align: left;
          margin-top: 28px;
        }
        .timeanddate {
          display: flex;
          justify-content: space-between;
        }  
    `;
  }

  render({config} = this) {
    var date = new Date()
    var hour = date.getHours()
    var pdtime = ''
    var yeshen = ''
    if(hour >=6 && hour <9){
        pdtime = "早上好，"
    }else if(hour >=9 && hour <12){
        pdtime = "上午好，"
    }else if(hour >=12 && hour <13){
        pdtime = "中午好，"
    }else if(hour >=13 && hour <18){
        pdtime = "下午好，"
    }else if(hour >=18 && hour <23){
        pdtime = "晚上好，"
    }else{
        pdtime = "夜深了，"
        yeshen = "夜深了，不要熬夜了，"
    }
    return html`
      <ha-card>
        <div class="container" @click=${this._moreInfo}>
          <div style="align-items: baseline;">
            <div class="title">${this.title}</div>
          </div>
          <div class="date_pdtime">
          ${pdtime}${this.user}
          </div>
          <div class="date_text">
          ${config.text}一日三餐，记得按时吃饭，${yeshen}身体健康最重要！
          </div>          
          <div class="timeanddate">
            <div class="clock">
            ${this.currentTime}
            </div>  
            <div class="date_solar">
              ${this.attributes.solar}
            </div>
          </div>  
          <div class="date_week">
            <p class="icon_state" style="background: none, url(${this.getStateIcon(this.calendarEntity.state)}) no-repeat; background-size: contain;"></p>
            ${this.calendarEntity.state}丨${this.attributes.week}
          </div>
          <!--
          <div class="date_week">
            ${this.calendarEntity.state}，${this.attributes.week}
          </div>
          -->
          <div class="date_lunar">
            ${this.attributes.lunar}
          </div>
          <div class="latest_title">距离</div>
          <div class="latest_holiday">${this.latestReminder.name}</div>
     
          <div class="latest_days">
          <span class="days-number">${this.latestReminder.days}</span>
          <span class="days-text">天</span>
          </div>
          <div class="latest_date">${this.dateFormatIfNeed(this.latestReminder.date)}</div>
        </div>
        <div class=list_container>
          ${this.reminderList.map((item, index) => 
            html`
              <table class="table" border="0">
              <td class="icon_container">
                <i class="icon" style="background: none, url(${this.getIcon(index)}) no-repeat; background-size: contain;"></i>
              </td>

              <td>
                <table>
                  <tr>
                    <td class="cell_name">${item.name}</td>
                  </tr>
                  <tr>
                    <td class="cell_date">${this.dateFormatIfNeed(item.date)}</td>
                  </tr>
                </table>
              </td>

              ${item.highlight ? 
                html` 
                <td class="cell_day_h">
                ${item.days}
                ${item.unit ? html`天` : html``}
                </td>
                ` : 
                html`
                <td class="cell_day_n">
                ${item.days}
                ${item.unit ? html`天` : html``}
                </td>
                `}

            </table>
            ${item.hiddenLine ? html`` : html`<div style="float:right;width:90%;border-top:1px solid #f5f5f5;height:0.5px;"></div>`}
            `
          )}
        </div>

      </ha-card>
    `;


  }

  firstUpdated() {
    super.firstUpdated();
    console.log("firstUpdated");
  }

  updated(changedProperties) {
    console.log("updated");
  }

  static get properties() {

    return {
      config: { type: Object },
      calendarEntity: {
        type: Object,
        observer: 'dataChanged',
      },
      attributes: { type: Object },
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('Please define "calendar" entity in the card config');
    }
    this.config = config;
   }

  constructor() {
    super();
    const options = {
      hour: '2-digit',
      minute: 'numeric',
      second: 'none',
    }
    var d = new Date();
    this.currentTime = d.toLocaleTimeString('en-US', {hour12: false,hour: '2-digit', minute:'2-digit'});
    setInterval(() => {
      var d = new Date();
      this.currentTime = d.toLocaleTimeString('en-US', {hour12: false,hour: '2-digit', minute:'2-digit'});
      this.requestUpdate();
    }, 1000);

  }
  set hass(hass) {
    this._hass = hass;
    // this.lang = this._hass.selectedLanguage || this._hass.language;
    this.calendarEntity = this.config.entity in hass.states ? hass.states[this.config.entity] : null;
    if (!this.calendarEntity) {
      return;
    }
    var list = [];
    var attributes = this.calendarEntity.attributes['data'];
    if (!attributes) {
      return;
    }
    var user = this._hass.user.name
    this.user = user    
    this.attributes = attributes;
    // attributes['term'] = '春分';
    // attributes['festival'] = '春节';
    // attributes['anniversary'] = 'cc纪念日';
    
    // attributes['nearest_anniversary'] = 'aa生日';
    // attributes['nearest_anniversary_date'] = '20200627';
    // attributes['nearest_anniversary_days'] = 130;
    
    // attributes['nearest_holiday'] = '端午节';
    // attributes['nearest_holiday_date'] = '2020-11-11';
    // attributes['nearest_holiday_days'] = 10;

    // attributes['calculate_age_past'] = 'aa和bb纪念日';
    // attributes['calculate_age_past_date'] = '1900-01-01';
    // attributes['calculate_age_past_interval'] = '20001010101';
    // attributes['calculate_age_past_description'] = '2年2月2日2小时2分2秒';

    // attributes['calculate_age_future'] = 'aa和bb纪念日';
    // attributes['calculate_age_future_date'] = '2030-01-01';
    // attributes['calculate_age_future_interval'] = '20001010101';
    // attributes['calculate_age_future_description'] = '2年2月2日2小时2分2秒';


    if (attributes['term']) {
      list.push({'name':'节气','date':'今天','days':attributes['term']});
    }

    if (attributes['festival']) {
      list.push({'name':'节假日','date':'今天','days':attributes['festival']});
    }

    if (attributes['anniversary']) {
      list.push({'name':'纪念日','date':'今天','days':attributes['anniversary']});
    }


    if (attributes['tomorrow_state']) {
      list.push({'name':'状态','date':'明天','days':attributes['tomorrow_state']});
    }

    var holiday_days = 0,anniversary_days = 0;
    var beAdd;
    if (attributes['nearest_holiday']) {
      var obj = {'name':attributes['nearest_holiday'],'date':attributes['nearest_holiday_date'],'days':attributes['nearest_holiday_days'],'unit':'天','highlight':true};
        this.latestReminder = obj;
    }
    if (attributes['nearest_anniversary']) {
      var obj = {'name':attributes['nearest_anniversary'],'date':attributes['nearest_anniversary_date'],'days':attributes['nearest_anniversary_days'],'unit':'天','highlight':true};
        if (this.latestReminder) {
          if (this.latestReminder['days'] > obj['days']) {
            beAdd = this.latestReminder;
            this.latestReminder = obj;
          } else {
            beAdd = obj;
          }
        } else {
          this.latestReminder = obj;
        }

    }


    if (beAdd) {
      list.push(beAdd);
      
    }
    if (attributes.hasOwnProperty('next_anniversaries')) {
        var next_anniversaries = attributes['next_anniversaries'];
        for (var i = 0; i < next_anniversaries.length;i++) {
          var dict = next_anniversaries[i];
	      list.push({'name':dict['name'],'date':dict['date'],'days':dict['days'],'unit':'天','highlight':true});
        }    
    }


    if (attributes.hasOwnProperty('future_dates')) {
      var future_dates = attributes['future_dates'];
      for (var i = 0; i < future_dates.length;i++) {
        var dict = future_dates[i];
        list.push({'name':dict['name'],'date':dict['date'],'days':dict['description'],'highlight':true});
      }
    }


    if (attributes.hasOwnProperty('past_dates')) {
      var past_dates = attributes['past_dates'];
      for (var i = 0; i < past_dates.length;i++) {
        var dict = past_dates[i];
        list.push({'name':dict['name'],'date':dict['date'],'days':dict['description']});
      }      
    }

    var info = attributes['holiday_info']
    if (info) {
        list.push({'days':info});    
      }

    var last = list[list.length-1];
    last['hiddenLine'] = true;

    this.reminderList = list;

  }

    //transfer yyyyMMdd to yyyy-MM-dd
  dateFormatIfNeed(date_str) {
    const regex = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[01])$/;

    if (regex.test(date_str)) {
      const formattedDate = date_str.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
      return formattedDate
    } 

    return date_str
  }

  getIcon(index) {
    return `${
      this.config.icons
    }${
      index
    }.png`;
  }

  getStateIcon(state) {
	var stateIcons = [{state:'工作日', icon:'working'},{state:'休息日', icon:'dating'},{state:'节假日', icon:'vacation'}];
	var iconName = "";
	
	stateIcons.forEach(function(item, index) {
        if(item.state == state) {
            iconName = item.icon;
            return true;
        }
    });		
	
    return `${
      this.config.icons
    }${
      iconName
    }.png`;
  }

  _fire(type, detail, options) {
    const node = this.shadowRoot;
    options = options || {};
    detail = (detail === null || detail === undefined) ? {} : detail;
    const e = new Event(type, {
      bubbles: options.bubbles === undefined ? true : options.bubbles,
      cancelable: Boolean(options.cancelable),
      composed: options.composed === undefined ? true : options.composed
    });
    e.detail = detail;
    node.dispatchEvent(e);
    return e;
  }

  _moreInfo() {
    console.log('moreInfo')
    this._fire('hass-more-info', { entityId: this.config.entity });
  }
}


customElements.define('ch_calendar-card', ChineseCalendarCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ch_calendar-card",
  name: "中国节假日日历卡片",
  preview: true, // Optional - defaults to false
  description: "中国节假日日历卡片" // Optional
});
