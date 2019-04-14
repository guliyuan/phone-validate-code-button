import rs from '@/service/axios'

export default {
    postCode(phone) {
        return rs.post(`sendCode/${phone}`);
    },
    getCode(phone){
        return rs.get(`api/sendCode`);
    }
}