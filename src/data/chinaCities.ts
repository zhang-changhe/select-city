import { City } from '@/types';

// 省份-城市二级结构
export interface ProvinceCity {
  province: string;
  provinceCode: string;
  cities: City[];
}

// 全国所有地级市数据
export const chinaCities: ProvinceCity[] = [
  {
    province: '北京市',
    provinceCode: 'BJ',
    cities: [
      { id: 'bj', name: '北京', province: '北京市' }
    ]
  },
  {
    province: '天津市',
    provinceCode: 'TJ',
    cities: [
      { id: 'tj', name: '天津', province: '天津市' }
    ]
  },
  {
    province: '上海市',
    provinceCode: 'SH',
    cities: [
      { id: 'sh', name: '上海', province: '上海市' }
    ]
  },
  {
    province: '重庆市',
    provinceCode: 'CQ',
    cities: [
      { id: 'cq', name: '重庆', province: '重庆市' }
    ]
  },
  {
    province: '河北省',
    provinceCode: 'HE',
    cities: [
      { id: 'sjz', name: '石家庄', province: '河北省' },
      { id: 'ts', name: '唐山', province: '河北省' },
      { id: 'qhd', name: '秦皇岛', province: '河北省' },
      { id: 'hd', name: '邯郸', province: '河北省' },
      { id: 'xt', name: '邢台', province: '河北省' },
      { id: 'bd', name: '保定', province: '河北省' },
      { id: 'zjk', name: '张家口', province: '河北省' },
      { id: 'cd', name: '承德', province: '河北省' },
      { id: 'lf', name: '廊坊', province: '河北省' },
      { id: 'hs', name: '衡水', province: '河北省' },
      { id: 'cangzhou', name: '沧州', province: '河北省' }
    ]
  },
  {
    province: '山西省',
    provinceCode: 'SX',
    cities: [
      { id: 'ty', name: '太原', province: '山西省' },
      { id: 'dt', name: '大同', province: '山西省' },
      { id: 'yangquan', name: '阳泉', province: '山西省' },
      { id: 'changzhi', name: '长治', province: '山西省' },
      { id: 'jincheng', name: '晋城', province: '山西省' },
      { id: 'shuozhou', name: '朔州', province: '山西省' },
      { id: 'jinzhong', name: '晋中', province: '山西省' },
      { id: 'yuncheng', name: '运城', province: '山西省' },
      { id: 'xinzhou', name: '忻州', province: '山西省' },
      { id: 'linfen', name: '临汾', province: '山西省' },
      { id: 'lvliang', name: '吕梁', province: '山西省' }
    ]
  },
  {
    province: '内蒙古自治区',
    provinceCode: 'NM',
    cities: [
      { id: 'hhht', name: '呼和浩特', province: '内蒙古自治区' },
      { id: 'bt', name: '包头', province: '内蒙古自治区' },
      { id: 'wuhai', name: '乌海', province: '内蒙古自治区' },
      { id: 'chifeng', name: '赤峰', province: '内蒙古自治区' },
      { id: 'tongliao', name: '通辽', province: '内蒙古自治区' },
      { id: 'ordos', name: '鄂尔多斯', province: '内蒙古自治区' },
      { id: 'hulunbeier', name: '呼伦贝尔', province: '内蒙古自治区' },
      { id: 'bayannaoer', name: '巴彦淖尔', province: '内蒙古自治区' },
      { id: 'wulanchabu', name: '乌兰察布', province: '内蒙古自治区' },
      { id: 'xinganmeng', name: '兴安盟', province: '内蒙古自治区' },
      { id: 'xilinguolemeng', name: '锡林郭勒盟', province: '内蒙古自治区' },
      { id: 'alashan', name: '阿拉善盟', province: '内蒙古自治区' }
    ]
  },
  {
    province: '辽宁省',
    provinceCode: 'LN',
    cities: [
      { id: 'shenyang', name: '沈阳', province: '辽宁省' },
      { id: 'dl', name: '大连', province: '辽宁省' },
      { id: 'anshan', name: '鞍山', province: '辽宁省' },
      { id: 'fushun', name: '抚顺', province: '辽宁省' },
      { id: 'benxi', name: '本溪', province: '辽宁省' },
      { id: 'dandong', name: '丹东', province: '辽宁省' },
      { id: 'jinzhou', name: '锦州', province: '辽宁省' },
      { id: 'yingkou', name: '营口', province: '辽宁省' },
      { id: 'fuxin', name: '阜新', province: '辽宁省' },
      { id: 'liaoyang', name: '辽阳', province: '辽宁省' },
      { id: 'panjin', name: '盘锦', province: '辽宁省' },
      { id: 'tieling', name: '铁岭', province: '辽宁省' },
      { id: 'chaoyang', name: '朝阳', province: '辽宁省' },
      { id: 'huludao', name: '葫芦岛', province: '辽宁省' }
    ]
  },
  {
    province: '吉林省',
    provinceCode: 'JL',
    cities: [
      { id: 'cc', name: '长春', province: '吉林省' },
      { id: 'jl', name: '吉林', province: '吉林省' },
      { id: 'siping', name: '四平', province: '吉林省' },
      { id: 'liaoyuan', name: '辽源', province: '吉林省' },
      { id: 'tonghua', name: '通化', province: '吉林省' },
      { id: 'baishan', name: '白山', province: '吉林省' },
      { id: 'songyuan', name: '松原', province: '吉林省' },
      { id: 'baicheng', name: '白城', province: '吉林省' },
      { id: 'yanbian', name: '延边', province: '吉林省' }
    ]
  },
  {
    province: '黑龙江省',
    provinceCode: 'HL',
    cities: [
      { id: 'heb', name: '哈尔滨', province: '黑龙江省' },
      { id: 'qiqihaer', name: '齐齐哈尔', province: '黑龙江省' },
      { id: 'jixi', name: '鸡西', province: '黑龙江省' },
      { id: 'hegang', name: '鹤岗', province: '黑龙江省' },
      { id: 'shuangyashan', name: '双鸭山', province: '黑龙江省' },
      { id: 'daqing', name: '大庆', province: '黑龙江省' },
      { id: 'yichun', name: '伊春', province: '黑龙江省' },
      { id: 'jiamusi', name: '佳木斯', province: '黑龙江省' },
      { id: 'qitaihe', name: '七台河', province: '黑龙江省' },
      { id: 'mudanjiang', name: '牡丹江', province: '黑龙江省' },
      { id: 'heihe', name: '黑河', province: '黑龙江省' },
      { id: 'suihua', name: '绥化', province: '黑龙江省' },
      { id: 'daxinganling', name: '大兴安岭', province: '黑龙江省' }
    ]
  },
  {
    province: '江苏省',
    provinceCode: 'JS',
    cities: [
      { id: 'nj', name: '南京', province: '江苏省' },
      { id: 'wx', name: '无锡', province: '江苏省' },
      { id: 'suzhou', name: '苏州', province: '江苏省' },
      { id: 'cz', name: '常州', province: '江苏省' },
      { id: 'nt', name: '南通', province: '江苏省' },
      { id: 'lyg', name: '连云港', province: '江苏省' },
      { id: 'huaian', name: '淮安', province: '江苏省' },
      { id: 'yz', name: '盐城', province: '江苏省' },
      { id: 'yangzhou', name: '扬州', province: '江苏省' },
      { id: 'zhenjiang', name: '镇江', province: '江苏省' },
      { id: 'taizhou', name: '泰州', province: '江苏省' },
      { id: 'suqian', name: '宿迁', province: '江苏省' }
    ]
  },
  {
    province: '浙江省',
    provinceCode: 'ZJ',
    cities: [
      { id: 'hz', name: '杭州', province: '浙江省' },
      { id: 'nb', name: '宁波', province: '浙江省' },
      { id: 'wenzhou', name: '温州', province: '浙江省' },
      { id: 'jiaxing', name: '嘉兴', province: '浙江省' },
      { id: 'huzhou', name: '湖州', province: '浙江省' },
      { id: 'shaoxing', name: '绍兴', province: '浙江省' },
      { id: 'jinhua', name: '金华', province: '浙江省' },
      { id: 'quzhou', name: '衢州', province: '浙江省' },
      { id: 'zhoushan', name: '舟山', province: '浙江省' },
      { id: 'taizhou_zj', name: '台州', province: '浙江省' },
      { id: 'lishui', name: '丽水', province: '浙江省' }
    ]
  },
  {
    province: '安徽省',
    provinceCode: 'AH',
    cities: [
      { id: 'hf', name: '合肥', province: '安徽省' },
      { id: 'wuhu', name: '芜湖', province: '安徽省' },
      { id: 'bengbu', name: '蚌埠', province: '安徽省' },
      { id: 'huainan', name: '淮南', province: '安徽省' },
      { id: 'maanshan', name: '马鞍山', province: '安徽省' },
      { id: 'huaibei', name: '淮北', province: '安徽省' },
      { id: 'tongling', name: '铜陵', province: '安徽省' },
      { id: 'anqing', name: '安庆', province: '安徽省' },
      { id: 'huangshan', name: '黄山', province: '安徽省' },
      { id: 'chuzhou', name: '滁州', province: '安徽省' },
      { id: 'fuyang', name: '阜阳', province: '安徽省' },
      { id: 'suzhou_ah', name: '宿州', province: '安徽省' },
      { id: 'luan', name: '六安', province: '安徽省' },
      { id: 'bozhou', name: '亳州', province: '安徽省' },
      { id: 'chizhou', name: '池州', province: '安徽省' },
      { id: 'xuancheng', name: '宣城', province: '安徽省' }
    ]
  },
  {
    province: '福建省',
    provinceCode: 'FJ',
    cities: [
      { id: 'fz', name: '福州', province: '福建省' },
      { id: 'xm', name: '厦门', province: '福建省' },
      { id: 'putian', name: '莆田', province: '福建省' },
      { id: 'sanming', name: '三明', province: '福建省' },
      { id: 'quanzhou', name: '泉州', province: '福建省' },
      { id: 'zhangzhou', name: '漳州', province: '福建省' },
      { id: 'nanping', name: '南平', province: '福建省' },
      { id: 'longyan', name: '龙岩', province: '福建省' },
      { id: 'ningde', name: '宁德', province: '福建省' }
    ]
  },
  {
    province: '江西省',
    provinceCode: 'JX',
    cities: [
      { id: 'nanchang', name: '南昌', province: '江西省' },
      { id: 'jingdezhen', name: '景德镇', province: '江西省' },
      { id: 'pingxiang', name: '萍乡', province: '江西省' },
      { id: 'jiujiang', name: '九江', province: '江西省' },
      { id: 'xinyu', name: '新余', province: '江西省' },
      { id: 'yingtan', name: '鹰潭', province: '江西省' },
      { id: 'ganzhou', name: '赣州', province: '江西省' },
      { id: 'jian', name: '吉安', province: '江西省' },
      { id: 'yichun', name: '宜春', province: '江西省' },
      { id: 'fuzhou_jx', name: '抚州', province: '江西省' },
      { id: 'shangrao', name: '上饶', province: '江西省' }
    ]
  },
  {
    province: '山东省',
    provinceCode: 'SD',
    cities: [
      { id: 'jn', name: '济南', province: '山东省' },
      { id: 'qd', name: '青岛', province: '山东省' },
      { id: 'zibo', name: '淄博', province: '山东省' },
      { id: 'zaozhuang', name: '枣庄', province: '山东省' },
      { id: 'dongying', name: '东营', province: '山东省' },
      { id: 'yantai', name: '烟台', province: '山东省' },
      { id: 'weifang', name: '潍坊', province: '山东省' },
      { id: 'jining', name: '济宁', province: '山东省' },
      { id: 'taian', name: '泰安', province: '山东省' },
      { id: 'weihai', name: '威海', province: '山东省' },
      { id: 'rizhao', name: '日照', province: '山东省' },
      { id: 'binzhou', name: '滨州', province: '山东省' },
      { id: 'dezhou', name: '德州', province: '山东省' },
      { id: 'liaocheng', name: '聊城', province: '山东省' },
      { id: 'linyi', name: '临沂', province: '山东省' },
      { id: 'heze', name: '菏泽', province: '山东省' }
    ]
  },
  {
    province: '河南省',
    provinceCode: 'HA',
    cities: [
      { id: 'zz', name: '郑州', province: '河南省' },
      { id: 'kaifeng', name: '开封', province: '河南省' },
      { id: 'luoyang', name: '洛阳', province: '河南省' },
      { id: 'pingdingshan', name: '平顶山', province: '河南省' },
      { id: 'anyang', name: '安阳', province: '河南省' },
      { id: 'hebi', name: '鹤壁', province: '河南省' },
      { id: 'xinxiang', name: '新乡', province: '河南省' },
      { id: 'jiaozuo', name: '焦作', province: '河南省' },
      { id: 'puyang', name: '濮阳', province: '河南省' },
      { id: 'xuchang', name: '许昌', province: '河南省' },
      { id: 'luohe', name: '漯河', province: '河南省' },
      { id: 'sanmenxia', name: '三门峡', province: '河南省' },
      { id: 'nanyang', name: '南阳', province: '河南省' },
      { id: 'shangqiu', name: '商丘', province: '河南省' },
      { id: 'xinyang', name: '信阳', province: '河南省' },
      { id: 'zhoukou', name: '周口', province: '河南省' },
      { id: 'zhumadian', name: '驻马店', province: '河南省' },
      { id: 'jiyuan', name: '济源', province: '河南省' }
    ]
  },
  {
    province: '湖北省',
    provinceCode: 'HB',
    cities: [
      { id: 'wh', name: '武汉', province: '湖北省' },
      { id: 'huangshi', name: '黄石', province: '湖北省' },
      { id: 'shiyan', name: '十堰', province: '湖北省' },
      { id: 'yichang', name: '宜昌', province: '湖北省' },
      { id: 'xiangyang', name: '襄阳', province: '湖北省' },
      { id: 'ezhou', name: '鄂州', province: '湖北省' },
      { id: 'jingmen', name: '荆门', province: '湖北省' },
      { id: 'xiaogan', name: '孝感', province: '湖北省' },
      { id: 'jingzhou', name: '荆州', province: '湖北省' },
      { id: 'huanggang', name: '黄冈', province: '湖北省' },
      { id: 'xianning', name: '咸宁', province: '湖北省' },
      { id: 'suizhou', name: '随州', province: '湖北省' },
      { id: 'enshi', name: '恩施', province: '湖北省' },
      { id: 'xiantao', name: '仙桃', province: '湖北省' },
      { id: 'qianjiang', name: '潜江', province: '湖北省' },
      { id: 'tianmen', name: '天门', province: '湖北省' },
      { id: 'shennongjia', name: '神农架', province: '湖北省' }
    ]
  },
  {
    province: '湖南省',
    provinceCode: 'HN',
    cities: [
      { id: 'cs', name: '长沙', province: '湖南省' },
      { id: 'zhuzhou', name: '株洲', province: '湖南省' },
      { id: 'xiangtan', name: '湘潭', province: '湖南省' },
      { id: 'hengyang', name: '衡阳', province: '湖南省' },
      { id: 'shaoyang', name: '邵阳', province: '湖南省' },
      { id: 'yueyang', name: '岳阳', province: '湖南省' },
      { id: 'changde', name: '常德', province: '湖南省' },
      { id: 'zhangjiajie', name: '张家界', province: '湖南省' },
      { id: 'yiyang', name: '益阳', province: '湖南省' },
      { id: 'chenzhou', name: '郴州', province: '湖南省' },
      { id: 'yongzhou', name: '永州', province: '湖南省' },
      { id: 'huaihua', name: '怀化', province: '湖南省' },
      { id: 'loudi', name: '娄底', province: '湖南省' },
      { id: 'xiangxi', name: '湘西', province: '湖南省' }
    ]
  },
  {
    province: '广东省',
    provinceCode: 'GD',
    cities: [
      { id: 'gz', name: '广州', province: '广东省' },
      { id: 'sz', name: '深圳', province: '广东省' },
      { id: 'zh', name: '珠海', province: '广东省' },
      { id: 'st', name: '汕头', province: '广东省' },
      { id: 'fs', name: '佛山', province: '广东省' },
      { id: 'jiangmen', name: '江门', province: '广东省' },
      { id: 'zhanjiang', name: '湛江', province: '广东省' },
      { id: 'maoming', name: '茂名', province: '广东省' },
      { id: 'zhaoqing', name: '肇庆', province: '广东省' },
      { id: 'huizhou', name: '惠州', province: '广东省' },
      { id: 'meizhou', name: '梅州', province: '广东省' },
      { id: 'shanwei', name: '汕尾', province: '广东省' },
      { id: 'heyuan', name: '河源', province: '广东省' },
      { id: 'yangjiang', name: '阳江', province: '广东省' },
      { id: 'qingyuan', name: '清远', province: '广东省' },
      { id: 'dg', name: '东莞', province: '广东省' },
      { id: 'zs', name: '中山', province: '广东省' },
      { id: 'chaozhou', name: '潮州', province: '广东省' },
      { id: 'jieyang', name: '揭阳', province: '广东省' },
      { id: 'yunfu', name: '云浮', province: '广东省' }
    ]
  },
  {
    province: '广西壮族自治区',
    provinceCode: 'GX',
    cities: [
      { id: 'nn', name: '南宁', province: '广西壮族自治区' },
      { id: 'liuzhou', name: '柳州', province: '广西壮族自治区' },
      { id: 'guilin', name: '桂林', province: '广西壮族自治区' },
      { id: 'wuzhou', name: '梧州', province: '广西壮族自治区' },
      { id: 'beihai', name: '北海', province: '广西壮族自治区' },
      { id: 'fangchenggang', name: '防城港', province: '广西壮族自治区' },
      { id: 'qinzhou', name: '钦州', province: '广西壮族自治区' },
      { id: 'guigang', name: '贵港', province: '广西壮族自治区' },
      { id: 'yulin', name: '玉林', province: '广西壮族自治区' },
      { id: 'baise', name: '百色', province: '广西壮族自治区' },
      { id: 'hezhou', name: '贺州', province: '广西壮族自治区' },
      { id: 'hechi', name: '河池', province: '广西壮族自治区' },
      { id: 'laibin', name: '来宾', province: '广西壮族自治区' },
      { id: 'chongzuo', name: '崇左', province: '广西壮族自治区' }
    ]
  },
  {
    province: '海南省',
    provinceCode: 'HI',
    cities: [
      { id: 'hk', name: '海口', province: '海南省' },
      { id: 'sy', name: '三亚', province: '海南省' },
      { id: 'sansha', name: '三沙', province: '海南省' },
      { id: 'danzhou', name: '儋州', province: '海南省' },
      { id: 'wuzhishan', name: '五指山', province: '海南省' },
      { id: 'wanning', name: '万宁', province: '海南省' },
      { id: 'wenchang', name: '文昌', province: '海南省' },
      { id: 'qionghai', name: '琼海', province: '海南省' },
      { id: 'dongfang', name: '东方', province: '海南省' },
      { id: 'dingan', name: '定安', province: '海南省' },
      { id: 'tunchang', name: '屯昌', province: '海南省' },
      { id: 'chengmai', name: '澄迈', province: '海南省' },
      { id: 'lingao', name: '临高', province: '海南省' },
      { id: 'baisha', name: '白沙', province: '海南省' },
      { id: 'changjiang', name: '昌江', province: '海南省' },
      { id: 'ledong', name: '乐东', province: '海南省' },
      { id: 'lingshui', name: '陵水', province: '海南省' },
      { id: 'baoting', name: '保亭', province: '海南省' },
      { id: 'qiongzhong', name: '琼中', province: '海南省' }
    ]
  },
  {
    province: '四川省',
    provinceCode: 'SC',
    cities: [
      { id: 'cd', name: '成都', province: '四川省' },
      { id: 'zigong', name: '自贡', province: '四川省' },
      { id: 'panzhihua', name: '攀枝花', province: '四川省' },
      { id: 'luzhou', name: '泸州', province: '四川省' },
      { id: 'deyang', name: '德阳', province: '四川省' },
      { id: 'mianyang', name: '绵阳', province: '四川省' },
      { id: 'guangyuan', name: '广元', province: '四川省' },
      { id: 'suining', name: '遂宁', province: '四川省' },
      { id: 'neijiang', name: '内江', province: '四川省' },
      { id: 'leshan', name: '乐山', province: '四川省' },
      { id: 'nanchong', name: '南充', province: '四川省' },
      { id: 'meishan', name: '眉山', province: '四川省' },
      { id: 'yibin', name: '宜宾', province: '四川省' },
      { id: 'guangan', name: '广安', province: '四川省' },
      { id: 'dazhou', name: '达州', province: '四川省' },
      { id: 'yaan', name: '雅安', province: '四川省' },
      { id: 'bazhong', name: '巴中', province: '四川省' },
      { id: 'ziyang', name: '资阳', province: '四川省' },
      { id: 'aba', name: '阿坝', province: '四川省' },
      { id: 'ganzi', name: '甘孜', province: '四川省' },
      { id: 'liangshan', name: '凉山', province: '四川省' }
    ]
  },
  {
    province: '贵州省',
    provinceCode: 'GZ',
    cities: [
      { id: 'gy', name: '贵阳', province: '贵州省' },
      { id: 'liupanshui', name: '六盘水', province: '贵州省' },
      { id: 'zunyi', name: '遵义', province: '贵州省' },
      { id: 'anshun', name: '安顺', province: '贵州省' },
      { id: 'bijie', name: '毕节', province: '贵州省' },
      { id: 'tongren', name: '铜仁', province: '贵州省' },
      { id: 'qianxinan', name: '黔西南', province: '贵州省' },
      { id: 'qiandongnan', name: '黔东南', province: '贵州省' },
      { id: 'qiannan', name: '黔南', province: '贵州省' }
    ]
  },
  {
    province: '云南省',
    provinceCode: 'YN',
    cities: [
      { id: 'km', name: '昆明', province: '云南省' },
      { id: 'qujing', name: '曲靖', province: '云南省' },
      { id: 'yuxi', name: '玉溪', province: '云南省' },
      { id: 'baoshan', name: '保山', province: '云南省' },
      { id: 'zhaotong', name: '昭通', province: '云南省' },
      { id: 'lijiang', name: '丽江', province: '云南省' },
      { id: 'puer', name: '普洱', province: '云南省' },
      { id: 'lincang', name: '临沧', province: '云南省' },
      { id: 'chuxiong', name: '楚雄', province: '云南省' },
      { id: 'honghe', name: '红河', province: '云南省' },
      { id: 'wenshan', name: '文山', province: '云南省' },
      { id: 'xishuangbanna', name: '西双版纳', province: '云南省' },
      { id: 'dali', name: '大理', province: '云南省' },
      { id: 'dehong', name: '德宏', province: '云南省' },
      { id: 'nujiang', name: '怒江', province: '云南省' },
      { id: 'diqing', name: '迪庆', province: '云南省' }
    ]
  },
  {
    province: '西藏自治区',
    provinceCode: 'XZ',
    cities: [
      { id: 'lasa', name: '拉萨', province: '西藏自治区' },
      { id: 'rikaze', name: '日喀则', province: '西藏自治区' },
      { id: 'changdu', name: '昌都', province: '西藏自治区' },
      { id: 'linzhi', name: '林芝', province: '西藏自治区' },
      { id: 'shannan', name: '山南', province: '西藏自治区' },
      { id: 'naqu', name: '那曲', province: '西藏自治区' },
      { id: 'ali', name: '阿里', province: '西藏自治区' }
    ]
  },
  {
    province: '陕西省',
    provinceCode: 'SN',
    cities: [
      { id: 'xa', name: '西安', province: '陕西省' },
      { id: 'tongchuan', name: '铜川', province: '陕西省' },
      { id: 'baoji', name: '宝鸡', province: '陕西省' },
      { id: 'xianyang', name: '咸阳', province: '陕西省' },
      { id: 'weinan', name: '渭南', province: '陕西省' },
      { id: 'yanan', name: '延安', province: '陕西省' },
      { id: 'hanzhong', name: '汉中', province: '陕西省' },
      { id: 'yulin', name: '榆林', province: '陕西省' },
      { id: 'ankang', name: '安康', province: '陕西省' },
      { id: 'shangluo', name: '商洛', province: '陕西省' }
    ]
  },
  {
    province: '甘肃省',
    provinceCode: 'GS',
    cities: [
      { id: 'lz', name: '兰州', province: '甘肃省' },
      { id: 'jiayuguan', name: '嘉峪关', province: '甘肃省' },
      { id: 'jinchang', name: '金昌', province: '甘肃省' },
      { id: 'baiyin', name: '白银', province: '甘肃省' },
      { id: 'tianshui', name: '天水', province: '甘肃省' },
      { id: 'wuwei', name: '武威', province: '甘肃省' },
      { id: 'zhangye', name: '张掖', province: '甘肃省' },
      { id: 'pingliang', name: '平凉', province: '甘肃省' },
      { id: 'jiuquan', name: '酒泉', province: '甘肃省' },
      { id: 'qingyang', name: '庆阳', province: '甘肃省' },
      { id: 'dingxi', name: '定西', province: '甘肃省' },
      { id: 'longnan', name: '陇南', province: '甘肃省' },
      { id: 'linxia', name: '临夏', province: '甘肃省' },
      { id: 'gannan', name: '甘南', province: '甘肃省' }
    ]
  },
  {
    province: '青海省',
    provinceCode: 'QH',
    cities: [
      { id: 'xnc', name: '西宁', province: '青海省' },
      { id: 'haidong', name: '海东', province: '青海省' },
      { id: 'haibei', name: '海北', province: '青海省' },
      { id: 'huangnan', name: '黄南', province: '青海省' },
      { id: 'hainan', name: '海南', province: '青海省' },
      { id: 'guoluo', name: '果洛', province: '青海省' },
      { id: 'yushu', name: '玉树', province: '青海省' },
      { id: 'haixi', name: '海西', province: '青海省' }
    ]
  },
  {
    province: '宁夏回族自治区',
    provinceCode: 'NX',
    cities: [
      { id: 'yl', name: '银川', province: '宁夏回族自治区' },
      { id: 'shizuishan', name: '石嘴山', province: '宁夏回族自治区' },
      { id: 'wuzhong', name: '吴忠', province: '宁夏回族自治区' },
      { id: 'guyuan', name: '固原', province: '宁夏回族自治区' },
      { id: 'zhongwei', name: '中卫', province: '宁夏回族自治区' }
    ]
  },
  {
    province: '新疆维吾尔自治区',
    provinceCode: 'XJ',
    cities: [
      { id: 'wlmq', name: '乌鲁木齐', province: '新疆维吾尔自治区' },
      { id: 'kelamayi', name: '克拉玛依', province: '新疆维吾尔自治区' },
      { id: 'turpan', name: '吐鲁番', province: '新疆维吾尔自治区' },
      { id: 'hami', name: '哈密', province: '新疆维吾尔自治区' },
      { id: 'changji', name: '昌吉', province: '新疆维吾尔自治区' },
      { id: 'borutala', name: '博尔塔拉', province: '新疆维吾尔自治区' },
      { id: 'bayingolin', name: '巴音郭楞', province: '新疆维吾尔自治区' },
      { id: 'akesu', name: '阿克苏', province: '新疆维吾尔自治区' },
      { id: 'kezilesu', name: '克孜勒苏', province: '新疆维吾尔自治区' },
      { id: 'kashgar', name: '喀什', province: '新疆维吾尔自治区' },
      { id: 'hetian', name: '和田', province: '新疆维吾尔自治区' },
      { id: 'ili', name: '伊犁', province: '新疆维吾尔自治区' },
      { id: 'tacheng', name: '塔城', province: '新疆维吾尔自治区' },
      { id: 'aletai', name: '阿勒泰', province: '新疆维吾尔自治区' },
      { id: 'shihezi', name: '石河子', province: '新疆维吾尔自治区' },
      { id: 'alaer', name: '阿拉尔', province: '新疆维吾尔自治区' },
      { id: 'tumushuke', name: '图木舒克', province: '新疆维吾尔自治区' },
      { id: 'wujiaqu', name: '五家渠', province: '新疆维吾尔自治区' },
      { id: 'beiting', name: '北屯', province: '新疆维吾尔自治区' },
      { id: 'tiemenguan', name: '铁门关', province: '新疆维吾尔自治区' },
      { id: 'shuanghe', name: '双河', province: '新疆维吾尔自治区' },
      { id: 'kokdala', name: '可克达拉', province: '新疆维吾尔自治区' },
      { id: 'kunyu', name: '昆玉', province: '新疆维吾尔自治区' },
      { id: 'huyanghe', name: '胡杨河', province: '新疆维吾尔自治区' }
    ]
  },
  {
    province: '台湾省',
    provinceCode: 'TW',
    cities: [
      { id: 'taipei', name: '台北', province: '台湾省' },
      { id: 'xinbei', name: '新北', province: '台湾省' },
      { id: 'taoyuan', name: '桃园', province: '台湾省' },
      { id: 'taichung', name: '台中', province: '台湾省' },
      { id: 'tainan', name: '台南', province: '台湾省' },
      { id: 'kaohsiung', name: '高雄', province: '台湾省' },
      { id: 'keelung', name: '基隆', province: '台湾省' },
      { id: 'hsinchu', name: '新竹', province: '台湾省' },
      { id: 'chiayi', name: '嘉义', province: '台湾省' }
    ]
  },
  {
    province: '香港特别行政区',
    provinceCode: 'HK',
    cities: [
      { id: 'hk_sar', name: '香港', province: '香港特别行政区' }
    ]
  },
  {
    province: '澳门特别行政区',
    provinceCode: 'MO',
    cities: [
      { id: 'macao', name: '澳门', province: '澳门特别行政区' }
    ]
  }
];

// 获取所有城市（扁平化）
export const getAllCities = (): City[] => {
  return chinaCities.flatMap(province => province.cities);
};

// 根据省份获取城市
export const getCitiesByProvince = (province: string): City[] => {
  const provinceData = chinaCities.find(p => p.province === province);
  return provinceData ? provinceData.cities : [];
};

export default chinaCities;
