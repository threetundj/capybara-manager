<style lang="scss" scoped>
    .mt-input {
        border-bottom: 1px solid #EEEEEE;
        .mint-field-clear {
            margin-left: .1rem;
        }
        .mint-field-state {
            margin-left: .1rem;
        }
        .mint-cell {
            height: 100%!important;
        }
    }
</style>

<template>
    <div class='mt-input'>
        <a class="mint-cell mint-field">
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <span class="mint-cell-text">{{ label }}</span> 
                </div> 
                <div class="mint-cell-value">
                    <div class="mint-field-other">
                        <slot name="left"></slot>
                    </div>
                    <input 
                        class="mint-field-core"
                        type="text" 
                        @focus="handleCommentFocus" 
                        @blur="handleCommentBlur" 
                        :placeholder="placeholder" 
                        v-if="onFocus || inputValue == ''" 
                        v-model="inputValue" 
                        ref="input">
                    <span v-else @click="toggleFocus" class="mint-field-core">{{ showValue }}</span>
                    <span v-if="verify" :class="['mint-field-state', inputValue != '' ? validValue ? 'is-success' : 'is-error' : '']">
                        <i :class="['mintui', inputValue != '' ? validValue ? 'mintui-field-success' : 'mintui-field-error' : '']"></i>
                    </span>
                    <!-- <div v-show="!disableClear && onFocus && inputValue != ''" class="mint-field-clear" @click="inputValue = ''">
                        <i class="mintui mintui-field-error"></i>
                    </div> -->
                    <div class="mint-field-other">
                        <slot name="right"></slot>
                    </div>
                </div>
            </div> 
        </a>
    </div>
</template>

<script>
    export default {
        name: 'mt-input',
        props: {
            value: [String, Number],
            label: String,
            placeholder: String,
            format: null,
            // disableClear: Boolean,
            verify: null
        },
        data() {
            return {
               inputValue: this.value,
               onFocus: false,
               showValue: this.formatValue(this.value),
            }
        },
        watch: {
            value(current) {
                this.inputValue = current
                this.showValue = this.formatValue(current)
            },
            inputValue (current) {
                this.$emit('input', current)
            }
        },
        computed: {
            validValue() {  
                return this.verify ? this.verify(this.inputValue) : true
            }
        },
        methods: {
            formatValue(value) {
                return this.format ? this.format(value) : value
            },
            toggleFocus() {
                this.onFocus = true
                this.$nextTick(() => {
                    this.$refs.input.focus()
                })
            },
            handleCommentFocus() {
                this.onFocus = true
            },
            handleCommentBlur() {
                this.onFocus = false
                if (this.validValue) {
                    this.showValue = this.formatValue(this.inputValue)
                } else {
                    this.showValue = this.inputValue
                }
            }
        }
    }
</script>
