<style lang="scss" scoped>
    .date-select {
        position: fixed;
        top: .9rem;
        width: 100%;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        color: #1c93fb;
        font-size: .28rem;
        i{
            display: inline-block;
            padding: 0 .2rem;
            height: 100%;
            font-size: .28rem;
            &.disabled {
                color: #e0e0e0;
            }
        }
        span {
            display: inline-block;
            height: 100%;
            line-height: .9rem;
        }
    }
    .date-swipe-wrap {
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div class="date-swipe-wrap">
        <div class="date-select" v-show="disabled">
            <i class="mintui-back" @click="$emit('disabledClick')"></i>
            <span @click="$emit('disabledClick')">当日信息</span>
            <i class="mintui-right disabled"></i>
        </div>
        <div class="date-select" v-show="!disabled">
            <i :class="['mintui-back', isStartDay ? 'disabled' : '']" @click="handlePrev"></i>
            <span @click="openPicker">{{ !isToday ? showDate : '当日信息' }}</span>
            <i :class="['mintui-right', isToday ? 'disabled' : '']" @click="handleNext"></i>
        </div>
        <mt-swipe v-show="!disabled" @change="handleSwipeChange" ref="mtSwipe" :default-index="defaultIndex" :show-indicators="false" :auto="0" :continuous="false">
            <mt-swipe-item v-for="item in 31" ref="mtItem" :key="'blackbord' + item">
                <slot></slot>
            </mt-swipe-item>
        </mt-swipe>
        <div v-show="disabled">
            <slot></slot>
        </div>
        <mt-datetime-picker
            v-if="destory"
            v-model="selectDate"
            ref="picker"
            type="date"
            :startDate="startDate"
            :endDate="endDate"
            @visible-change="handleVisibleChange"
            @confirm="handelChange"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日">
        </mt-datetime-picker>
    </div>
</template>
<script>
    import { addClass, removeClass } from 'mint-ui/src/utils/dom';
    import { formatDate } from '@/filters/format'
    export default {
        name: 'date-swipe',
        props: {
            value: String,
            disabled: Boolean,
            defaultIndex: {
                type: Number,
                default: 30
            }
        },
        data() {
            var date = new Date()
            var endDate = date
            var startDate = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000)
            return {
                startDate: startDate,
                endDate: endDate,
                selectDate: endDate,
                showDate: formatDate(endDate),
                destory: false,
                activeIndex: 30
            }
        },
        beforeUpdate () {
            this.activeIndex = this.$refs.mtSwipe.index
        },
        computed: {
            isToday () {
                let date = new Date()
                return formatDate(date) === this.showDate
            },
            isStartDay () {
                return this.showDate === formatDate(this.startDate)
            }
        },
        watch: {
            value(current) {
                this.selectDate = new Date(current.replace(/-/g, "/"))
                this.showDate = formatDate(this.selectDate)
            },
            activeIndex(val, oldVal) {
                if(val < oldVal) {
                    this.selectDate = new Date(this.selectDate.getTime() - (oldVal - val) * 24 * 60 * 60 * 1000)
                    this.showDate = formatDate(this.selectDate)
                } else if(val > oldVal) {
                    this.selectDate = new Date(this.selectDate.getTime() + (val - oldVal) * 24 * 60 * 60 * 1000)
                    this.showDate = formatDate(this.selectDate)
                }
            },
            showDate(current) {
                this.$emit('input', current)
            }
        },
        methods: {
            openPicker() {
                this.destory = true
                this.$nextTick(() => {
                    this.$refs.picker.open();
                })
            },
            handelChange(newDate) {  
                let oldDate = new Date(this.showDate.replace(/-/g, "/"))
                let day = (newDate.getTime() - oldDate.getTime())/(24 * 60 * 60 * 1000)
                this.switchCar(this.activeIndex + day)
            },
            handleVisibleChange(value) {
                if(!value) {
                    this.destory = false
                    this.selectDate = new Date(this.showDate)
                }
            },
            handlePrev() {
                if(!this.isStartDay) {
                    this.$refs.mtSwipe.prev()
                }
            },
            handleNext() {
                if(!this.isToday) {                    
                    this.$refs.mtSwipe.next()
                }
            },
            handleSwipeChange(index) {
                this.activeIndex = this.$refs.mtSwipe.index
            },
            switchCar(index) {//自定义跳转，只需要传图片的下标即
                // debugger
                if(index==this.activeIndex)
                {
                    console.log('break off');
                    return;
                }

                var callback = () => {
                    if (index !== undefined) {
                        var newPage = this.$refs.mtItem[index].$el;
                        removeClass(curPage.$el, 'is-active');
                        addClass(newPage, 'is-active');

                        this.$refs.mtSwipe.index = index;
                    }
                    if (this.$refs.mtSwipe.isDone) {
                        this.$refs.mtSwipe.end();
                    }

                    if (prevPage) {
                        prevPage.$el.style.display = '';
                    }

                    if (nextPage) {
                        nextPage.$el.style.display = '';
                    }
                };

                if(index > this.activeIndex)
                {
                    var curPage = this.$refs.mtItem[this.activeIndex];
                    var nextPage = this.$refs.mtItem[index];
                    var pageWidth= this.$refs.mtItem[this.activeIndex].$el.clientWidth;
                    if (nextPage) {
                        nextPage.$el.style.display = 'block';
                        this.$refs.mtSwipe.translate(nextPage.$el, pageWidth);
                    }
                    this.$refs.mtSwipe.isDone = true;
                    this.$refs.mtSwipe.before(curPage.$el);

                    this.$refs.mtSwipe.translate(curPage.$el, -pageWidth, 300, callback);
                    if (nextPage) {
                        var self =this;
                        var timer = setTimeout(function(){
                            self.$refs.mtSwipe.translate(nextPage.$el, 0, 300);  
                            clearTimeout(timer);
                        },50)
                    }
                }
                else if(index < this.activeIndex)
                {
                    var curPage = this.$refs.mtItem[this.activeIndex];
                    var prevPage = this.$refs.mtItem[index];
                    var pageWidth= this.$refs.mtItem[this.activeIndex].$el.clientWidth;

                    if (prevPage) {
                        prevPage.$el.style.display = 'block';
                        this.$refs.mtSwipe.translate(prevPage.$el, -pageWidth);
                    }

                    this.$refs.mtSwipe.isDone = true;
                    this.$refs.mtSwipe.before(curPage.$el);
                    this.$refs.mtSwipe.translate(curPage.$el, pageWidth, 300, callback);
                    if (prevPage) {
                        this.$refs.mtSwipe.translate(prevPage.$el, 0, 300);
                    }
                }
            }
        }
    }
</script>
