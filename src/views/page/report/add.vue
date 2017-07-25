<template>
    <div class="app-container">
        <el-form :model="saveReport" ref="saveReport" label-width="100px">
            <el-form-item prop="title" label="测试报告名称">
                <el-input v-model="saveReport.title"></el-input>
            </el-form-item>
            <el-form-item prop="environment" label="测试环境">
                <el-input v-model="saveReport.environment"></el-input>
            </el-form-item>
            <el-form-item prop="tool" label="测试工具">
                <el-input v-model="saveReport.tool"></el-input>
            </el-form-item>
        </el-form>

        <el-form :model="saveReport" ref="saveReport" :inline="true" v-for="(item, index) in saveReport.items"
                 :key="index">
            <el-form-item
                    label="功能点"
                    :key="item.point"
                    :prop="item.point">
                <el-input  v-model="item.point"></el-input>
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
                            :prop="item.testItem">
                        <el-input v-model="subItem.testItem" style="width: 350px"></el-input>
                    </el-form-item>
                    <el-form-item :label="'类型'"
                                  :key="subItem.type"
                                  :prop="subItem.type">
                        <el-select v-model="subItem.type" placeholder="类型" style="width: 150px">
                            <el-option
                                    v-for="item in typeOption"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="'风险等级'"
                                  :key="subItem.level"
                                  :prop="subItem.level">
                        <el-select v-model="subItem.level" placeholder="风险等级" style="width: 120px">
                            <el-option
                                    v-for="level in levelOption"
                                    :key="level.label"
                                    :label="level.label"
                                    :value="level.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="'评测结果'"
                                  :key="subItem.result"
                                  :prop="subItem.result">
                        <el-select v-model="subItem.result" placeholder="评测结果" style="width: 120px">
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

        <el-table :data="saveReport.problems" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" class="demo-table-expand">
                        <el-form-item label="测试项目名称：">
                            {{ props.row.name }}
                        </el-form-item>
                        <el-form-item label="问题描述：">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                        <el-form-item label="检测流程：">
                            <span>{{ props.row.activiti }}</span>
                        </el-form-item>
                        <el-form-item label="评测输出：">
                            <span>{{ props.row.output }}</span>
                        </el-form-item>
                        <el-form-item label="评价输出：">
                            <span>{{ props.row.output }}</span>
                        </el-form-item>
                        <el-form-item label="修复建议：">
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

            <el-table-column label="操作">
                <template scope="scope">
                    <el-button @click="deleteRow(scope.$index, saveReport.problems)" type="text" size="small">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-form :model="saveReport" ref="saveReport" label-width="100px">
            <el-form-item align="right">
                <el-button @click="showVisible(true)">加一列</el-button>
                <el-button @click="addReport()">保存</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="编辑功能清单" :visible.sync="newTabel">
            <el-form :model="newProblem" ref="newProblem" label-width="100px">
                <el-form-item label="功能清单：">
                    <el-input v-model="newProblem.description"></el-input>
                </el-form-item>

                <el-form-item label="风险等级：">
                    <el-radio-group v-model="newProblem.level">
                        <el-radio label="低" value="低"></el-radio>
                        <el-radio label="中" value="中"></el-radio>
                        <el-radio label="高" value="高"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="评测结果：">
                    <el-radio-group v-model="newProblem.result">
                        <el-radio label="高危"></el-radio>
                        <el-radio label="低风险"></el-radio>
                        <el-radio label="安全"></el-radio>
                    </el-radio-group>
                </el-form-item>


                <el-form-item label="项目名称：">
                    <el-input v-model="newProblem.name"></el-input>
                </el-form-item>
                <el-form-item label="问题描述：">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容："
                            v-model="newProblem.desc">
                    </el-input>
                </el-form-item>
                <el-form-item label="检查流程：">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容："
                            v-model="newProblem.activiti">
                    </el-input>
                </el-form-item>
                <el-form-item label="评价输出：">
                    <el-input v-model="newProblem.output"></el-input>
                </el-form-item>
                <el-form-item label="修复建议：">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容："
                            v-model="newProblem.subscribe">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newTabel = false">取 消</el-button>
                <el-button type="primary" @click="addTableItem(newProblem)">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {addReport} from '@/api/report';

    export default {
        data() {
            return {
                newTabel: false,
                saveReport: {
                    user_id: 123,
                    user_name: "test",
                    title: '',
                    environment: '',
                    tool: '',
                    items: [],
                    problems: []
                },
                newSubmenu: {
                    testItem: '',
                    type: '',
                    level: '',
                    result: '',
                    pIndex: ''
                },
                newProblem: {
                    description: '',
                    level: '',
                    result: '',
                    name: '',
                    desc: '',
                    activiti: '',
                    output: '',
                    subscribe: '',
                },
                saveItems: [],
                saveProble: [],
                typeOption: [{
                    label: '服务器逻辑',
                    value: '服务器逻辑'
                }, {
                    label: '本地逻辑',
                    value: '本地逻辑'
                }, {
                    label: '数据安全',
                    value: '数据安全'
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
                this.saveReport.items.push({})
            },
            deleteItem(item, pIndex) {
                var index = this.saveReport.items.indexOf(item)
                if (index !== -1) {
                    this.saveReport.items.splice(index, 1)
                    this.saveItems.forEach(function (item, index,saveItems) {
                        if (item.pIndex === pIndex) {
                            let item = saveItems[index];
                            let subIndex = saveItems.indexOf(item)
                            saveItems.splice(subIndex, 1)
                        }
                    });
                    this.newItem = {point: ''}
                }
            },
            deleteIndexItem(subItem) {
                var subIndex = this.saveItems.indexOf(subItem)
                if (subIndex !== -1) {
                    this.saveItems.splice(subIndex, 1)
                    this.newSubmenu = {
                        testItem: '',
                        type: '',
                        level: '',
                        result: '',
                        pIndex: ''
                    }
                }
            },
            addIndexItem(index) {
                this.saveItems.push({
                    testItem: '',
                    type: '',
                    level: '',
                    result: '',
                    pIndex: index
                })
            },
            addTableItem(tableItem) {
                this.showVisible(false);
                this.saveReport.problems.push({
                    description: tableItem.description,
                    level: tableItem.level,
                    result: tableItem.result,
                    name: tableItem.name,
                    desc: tableItem.desc,
                    activiti: tableItem.activiti,
                    output: tableItem.output,
                    subscribe: tableItem.subscribe,
                })
                this.newProblem = {
                    description: '',
                    level: '',
                    result: '',
                    name: '',
                    desc: '',
                    activiti: '',
                    output: '',
                    subscribe: '',
                }
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            showVisible(flag) {
                this.newTabel = flag;
            },
            addReport() {
                addReport(this.saveReport).then(() => {
                    this.$router.push({path: '/'});
                })
            }
        }
    }
</script>
