<template>
    <el-table
            :data="reportList"
            style="width: 100%">
        <el-table-column
                prop="title"
                label="标题"
                width="700">
        </el-table-column>
        <el-table-column
                prop="creat_time"
                label="创建时间"
                width="200">
        </el-table-column>
        <el-table-column
                prop="user_name"
                label="创建者"
                width="150">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="100">
            <template scope="list">
                <el-button @click="look(list.row.id)" type="text" size="small">查看</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {getReport} from '@/api/report';

    export default {
        data() {
            return {
                reportList: []
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                getReport().then(() => {
                    this.reportList = response.data;
                })
            }
//                    [
//                    {
//                        "creat_time": "Tue, 25 Jul 2017 17:16:34 GMT",
//                        "environment": "1",
//                        "id": 3,
//                        "items": "[{\"point\": \"1\", \"testItem\": \"12323\"}]",
//                        "problems": "[{\"description\": \"123213\", \"level\": \"\\u9ad8\", \"result\": \"\\u4f4e\\u98ce\\u9669\", \"name\": \"123\", \"desc\": \"123\", \"activiti\": \"123\", \"output\": \"123\", \"subscribe\": \"123\"}]",
//                        "title": "1",
//                        "tool": "1",
//                        "user_id": 123,
//                        "user_name": "test"
//                    },
//                    {
//                        "creat_time": "Tue, 25 Jul 2017 17:18:23 GMT",
//                        "environment": "14343",
//                        "id": 4,
//                        "items": "[{\"point\": \"133\", \"testItem\": \"123233434\"}]",
//                        "problems": "[{\"description\": \"123213\", \"level\": \"\\u9ad8\", \"result\": \"\\u4f4e\\u98ce\\u9669\", \"name\": \"123\", \"desc\": \"123\", \"activiti\": \"123\", \"output\": \"123\", \"subscribe\": \"123\"}]",
//                        "title": "1343",
//                        "tool": "134343",
//                        "user_id": 123,
//                        "user_name": "test"
//                    }
//                ]
        }
    }
</script>
