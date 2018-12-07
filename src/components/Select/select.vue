<style lang="scss" scoped>
    .mintui-right {
        font-size: .24rem;
    }
    .cancel {
        color: #26a2ff;
        padding: 0 .24rem;
        display: inline-block;
        line-height: .8rem;
    }
    .confirm {
        float: right;
        @extend .cancel;
    }
    .select-value {
        color: #888888;
    }
</style>
<template>
    <div>
        <mt-field readonly :label="label" @click.native="showPopup">
            <mt-cell>
                <span class="select-value" v-if="data.length">{{ currentTags[valueKey] ? currentTags[valueKey] : placeholder }} <i class="mintui-right"></i></span>
                <span v-else style="color: #DEDEDE">暂无选项</span>
            </mt-cell>
        </mt-field>
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
            <mt-picker
                :slots="dataList" 
                :visible-item-count="5" 
                :show-toolbar="true"  
                ref="picker" 
                :value-key="valueKey">
                <span class="cancel" @click="popupVisible = false">取消</span>
                <span class="confirm" @click="handleConfirm">确认</span>
            </mt-picker>
        </mt-popup>
    </div>
</template>
<script>
    import _ from 'lodash'

    export default {
        name: 'mt-select',
        props: {
            value: Object,
            label: String,
            placeholder: String,
            valueKey: String,
            data: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                currentTags: {},
                popupVisible: false,
            }
        },
        watch: {
            value: {
                deep: true,
                handler(current) {
                    this.currentTags = _.cloneDeep(current)
                }
            }
        },
        computed: {
            dataList() {
                let list = _.cloneDeep(this.data)
                let slots = [
                    {
                        flex: 1,
                        values: list,
                        className: '',
                        textAlign: 'center'
                    }
                ]
                return slots;
            }
        },
        methods: {
            showPopup() {
                if(this.data.length) {
                    this.popupVisible = true;
                }
            },
            handleConfirm(picker, values) {
                this.popupVisible = false
                this.currentTags = this.$refs.picker.getValues()[0]
                this.$emit('input', _.cloneDeep(this.currentTags))
            }
        }
    }
</script>
