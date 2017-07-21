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
                <el-button @click="deleteItem(item,index)">删除功能点</el-button>
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
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="'风险等级'"
                                  :key="item.level"
                                  :prop="'saveItems.' + index + '.level'">
                        <el-select v-model="item.level" placeholder="风险等级">
                            <el-option
                                    v-for="level in levelOption"
                                    :key="level.label"
                                    :label="level.label"
                                    :value="level.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="'评测结果'"
                                  :key="item.result"
                                  :prop="'saveItems.' + index + '.result'">
                        <el-select v-model="item.result" placeholder="评测结果">
                            <el-option
                                    v-for="result in resultOption"
                                    :key="result.label"
                                    :label="result.label"
                                    :value="result.label ">
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

        <hr/>
        <hr/>
        <el-table :data="saveTable" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" class="demo-table-expand">
                        <el-form-item label="测试项目名称">
                            {{ props.row.name }}
                        </el-form-item>
                        <el-form-item label="问题描述">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                        <el-form-item label="检测流程">
                            <span>{{ props.row.activiti }}</span>
                        </el-form-item>
                        <el-form-item label="评测输出">
                            <span>{{ props.row.output }}</span>
                        </el-form-item>
                        <el-form-item label="评价输出">
                            <span>{{ props.row.output }}</span>
                        </el-form-item>
                        <el-form-item label="修复建议">
                            <span>{{ props.row.subscribe }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="测试功能清单" prop="description">
            </el-table-column>
            <el-table-column label="风险等级" prop="level">
            </el-table-column>
            <el-table-column label="评测结果" prop="result">
            </el-table-column>
        </el-table>

        <el-form :model="saveReport" ref="saveReport" label-width="100px">
            <el-form-item align="right">
                <el-button @click="addTableItem()">加一列</el-button>
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
                }],
                saveTable: [{
                    description: '人物移动：可以造成瞬移，一飞冲天',
                    level: '高',
                    result: '高危',
                    name: '人物移动',
                    desc: '问题描述',
                    activiti: '1.\t拦截游戏封包数据，并进行观察\n' +
                    '2.\t得知在人物飞行时候，判断当前坐标\n',
                    output: '高风险\n' +
                    '1.使用本地坐标进行飞行，这是十分危险的事情，玩家可以修改坐标进行瞬移等操作',
                    subscribe: ''
                }, {
                    description: '人物移动：可以造成瞬移，一飞冲天',
                    level: '高',
                    result: '高危',
                    name: '人物移动',
                    desc: '问题描述',
                    activiti: '1.\t拦截游戏封包数据，并进行观察\n' +
                    '2.\t得知在人物飞行时候，判断当前坐标\n',
                    output: '高风险\n' +
                    '1.使用本地坐标进行飞行，这是十分危险的事情，玩家可以修改坐标进行瞬移等操作',
                    subscribe: ''
                }, {
                    description: '人物移动：可以造成瞬移，一飞冲天',
                    level: '高',
                    result: '高危',
                    name: '人物移动',
                    desc: '问题描述',
                    activiti: '1.\t拦截游戏封包数据，并进行观察\n' +
                    '2.\t得知在人物飞行时候，判断当前坐标\n',
                    output: '高风险\n' +
                    '1.使用本地坐标进行飞行，这是十分危险的事情，玩家可以修改坐标进行瞬移等操作',
                    subscribe: ''
                }, {
                    description: '人物移动：可以造成瞬移，一飞冲天',
                    level: '高',
                    result: '高危',
                    name: '人物移动',
                    desc: '问题描述',
                    activiti: '1.\t拦截游戏封包数据，并进行观察\n' +
                    '2.\t得知在人物飞行时候，判断当前坐标\n',
                    output: '高风险\n' +
                    '1.使用本地坐标进行飞行，这是十分危险的事情，玩家可以修改坐标进行瞬移等操作',
                    subscribe: ''
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
            deleteItem(item, pIndex) {
                var index = this.saveReport.items.indexOf(item)
                if (index !== -1) {
                    this.saveReport.items.splice(index, 1)
                    this.saveItems.forEach(function (item, index, saveItems) {
                        if (item.pIndex === pIndex) {
                            let item = saveItems[index];
                            var subIndex = this.saveItems.indexOf(item)
                            this.saveItems.splice(subIndex, 1)
                        }
                    });
                }
            },
            deleteIndexItem(subItem) {
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
            },
            addTableItem() {
                this.saveTable.push({
                    description: '人物移动：可以造成瞬移，一飞冲天',
                    level: '高',
                    result: '高危',
                    name: '人物移动',
                    desc: '问题描述',
                    activiti: '1.\t拦截游戏封包数据，并进行观察\n' +
                    '2.\t得知在人物飞行时候，判断当前坐标\n',
                    output: '高风险\n' +
                    '1.使用本地坐标进行飞行，这是十分危险的事情，玩家可以修改坐标进行瞬移等操作',
                    subscribe: ''
                })
            }
        }
    }
</script>
