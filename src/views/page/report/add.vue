<template>
    <div class="app-container">
        <el-form :model="testForm1" ref="testForm1" label-width="100px">
            <el-form-item prop="environment" label="测试环境">
                <el-input v-model="testForm1.environment"></el-input>
            </el-form-item>
            <el-form-item prop="environment" label="测试工具">
                <el-input v-model="testForm1.tool"></el-input>
            </el-form-item>
        </el-form>

        <el-form :model="testForm2" ref="testForm2" :inline="true" v-for="(item, index) in testForm2.items"
                 :key="index">
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
                        <el-input v-model="item.testItem" style="width: 350px"></el-input>
                    </el-form-item>
                    <el-form-item :label="'类型'"
                                  :key="item.type"
                                  :prop="'saveItems.' + index + '.type'">
                        <el-select v-model="item.type" placeholder="类型" style="width: 150px">
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
                        <el-select v-model="item.level" placeholder="风险等级" style="width: 120px">
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
                        <el-select v-model="item.result" placeholder="评测结果" style="width: 120px">
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

    </div>
</template>

<script>
    export default{
        data(){
            return {
                testForm1: {
                    environment: '',
                    tfool: ''
                }
            }
        }
    }
</script>
