<style lang="scss">
    .mint-radio-input:checked + .mint-radio-core {
        background-color: #ffffff;
        border-color: #1C93FB;
        &::after {
            background-color: #1C93FB;
        }
    }
    .mint-radio-core {
        border-color: #1C93FB;
    }
    .mint-radiolist-label {
        padding: 0;
        display: flex;
        align-items: center;
    }
    .mint-radiolist {
        border-bottom: .02rem solid #EEEEEE;
    }
</style>
<template>
    <div class="mint-radiolist" @change="$emit('change', currentValue)">
        <label class="mint-radiolist-title" v-text="title"></label> 
        <a class="mint-cell" v-if="options.length" v-for="(option,index) in options" :key="index">
            <div class="mint-cell-left"></div> 
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title"> 
                    <label class="mint-radiolist-label">
                        <span class="mint-radio">
                            <input
                                class="mint-radio-input"
                                type="checkbox"
                                v-model="currentValue"
                                :disabled="option.disabled"
                                :value="option[valueKey] || option">
                            <span class="mint-radio-core"></span>
                        </span> 
                        <slot :data="option"></slot>
                    </label>
                </div>
                <div class="mint-cell-value">
                    <span></span>
                </div> 
            </div>
            <div class="mint-cell-right"></div>
        </a>
        <div class="mint-radiolist-title" style="border-bottom: none;" v-if="!options.length">暂无数据</div>
    </div>
</template>
<script>
    export default {
        name: 'mta-radio',
        props: {
            title: String,
            align: String,
            valueKey: String,
            options: {
                type: Array,
                required: true
            },
            value: Array
        },
        data() {
            return {
                currentValue: this.value,
            }
        },
        watch: {
            value(val) {
                this.currentValue = val;
            },
            currentValue(val) {
                this.$emit('input', val);
            }
        },
    }
</script>
