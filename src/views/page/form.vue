<template>
    <div class="app-container">
        <el-form :model="saveReport" ref="saveReport" label-width="100px">
            <el-form-item prop="environment" label="测试环境">
                <el-input v-model="saveReport.environment"></el-input>
            </el-form-item>
            <el-form-item prop="environment" label="测试工具">
                <el-input v-model="saveReport.tool"></el-input>
            </el-form-item>
        </el-form>
        <el-form :model="saveReport" ref="saveReport" :inline="true" v-for="(item, index) in saveReport.items">
            <el-form-item
                    :label="'功能点'"
                    :key="item.point"
                    :prop="'items.' + index + '.point'">
                <el-input v-model="item.point"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="addIndexItem(index)">新增测试项</el-button>
                <el-button @click="deleteItem(item)">删除功能点</el-button>
            </el-form-item>
            <div v-for="(subItem, subIndex) in saveItems" :key="subIndex">
                <div v-if="subItem.pIndex === index">
                    <el-form-item
                            :label="'测试项'"
                            :key="item.testItem"
                            :prop="'saveItems.' + index + '.testItem'">
                        <el-input v-model="item.testItem"></el-input>
                    </el-form-item>
                    <el-form-item :label="'类型'"
                                  :key="item.type"
                                  :prop="'saveItems.' + index + '.type'">
                        <el-select v-model="item.type" placeholder="类型">
                            <el-option
                                    v-for="item in typeOption"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="'风险等级'"
                                  :key="item.level"
                                  :prop="'saveItems.' + index + '.level'">
                        <el-select v-model="item.level" placeholder="风险等级">
                            <el-option
                                    v-for="level in levelOption"
                                    :key="level.value"
                                    :label="level.value"
                                    :value="level.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="'评测结果'"
                                  :key="item.result"
                                  :prop="'saveItems.' + index + '.result'">
                        <el-select v-model="item.result" placeholder="评测结果">
                            <el-option
                                    v-for="result in resultOption"
                                    :key="result.value"
                                    :label="result.value"
                                    :value="result.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-button @click="deleteIndexItem(subItem)">删除测试项</el-button>
                </div>
            </div>
        </el-form>
        <el-form :model="saveReport" ref="saveReport" label-width="100px">
            <el-form-item>
                <el-button @click="addItem()">新增功能点</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import ElForm from "../../../node_modules/element-ui/packages/form/src/form.vue";

    export default {
        components: {ElForm},
        data() {
            return {
                saveReport: {
                    environment: '',
                    tool: '',
                    items: []
                },
                saveItems: [],
                typeOption: [{
                    label: '服务器逻辑'
                }, {
                    label: '本地逻辑'
                }, {
                    label: '数据安全'
                }],
                levelOption: [{
                    label: ' 高'
                }, {
                    label: '中'
                }, {
                    label: '低'
                }],
                resultOption: [{
                    label: ' 高危'
                }, {
                    label: '低风险'
                }, {
                    label: '安全'
                }]
            }
        },
        methods: {
            addItem() {
                this.saveReport.items.push({
                    point: '',
                    key: Date.now()
                })
                console.log(this.saveReport.items.length);
            },
            deleteItem(item){
                var index = this.saveReport.items.indexOf(item)
                if (index !== -1) {
                    this.saveReport.items.splice(index, 1)
                }
            },
            deleteIndexItem(subItem){
                var subIndex = this.saveItems.indexOf(subItem)
                if (subIndex !== -1) {
                    this.saveItems.splice(subIndex, 1)
                }
            },
            addIndexItem(index) {
                this.saveItems.push({
                    testItem: '',
                    type: '',
                    level: '',
                    result: '',
                    pIndex: index,
                    key: Date.now()
                })
            }
        }
    }
</script>
