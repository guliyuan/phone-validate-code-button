import rs from '@/service/axios'

export default {
    getCode(phone){
        return rs.get(`api/sendCode/${phone}`);
    }
}