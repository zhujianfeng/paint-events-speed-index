import {paintEventsSpeedIndex} from './index';
import speedline from 'speedline';
import {Options} from 'speedline';
import * as path from 'path';

const benchmarkData = [
    ['http://tuijian.hao123.com', 'tuijian-hao123-com', 1440, 820],
    ['http://www.sina.com.cn', 'www-sina-com-cn', 1440, 820],
    ['https://weibo.com', 'weibo-com', 1440, 820],
    ['http://www.sohu.com', 'www-sohu-com', 1440, 820],
    ['http://tuijian.hao123.com', 'tuijian-hao123-com', 1440, 820],
    ['http://www.qq.com', 'www-qq-com', 1440, 820],
    ['http://www.163.com', 'www-163-com', 1440, 820],
    ['http://map.baidu.com', 'map-baidu-com', 1440, 820],
    ['http://v.hao123.baidu.com', 'v-hao123-baidu-com', 1440, 820],
    ['http://game.hao123.com', 'game-hao123-com', 1440, 820],
    ['http://www.eastmoney.com', 'www-eastmoney-com', 1440, 820],
    ['https://www.taobao.com', 'www-taobao-com', 1440, 820],
    ['https://haokan.baidu.com', 'haokan-baidu-com', 1440, 820],
    ['http://www.iqiyi.com', 'www-iqiyi-com', 1440, 820],
    ['https://www.ifeng.com', 'www-ifeng-com', 1440, 820],
    ['http://www.12306.cn', 'www-12306-cn', 1440, 820],
    ['http://www.cnki.net', 'www-cnki-net', 1440, 820],
    ['http://www.hao123.com/tejia', 'www-hao123-com-tejia', 1440, 820],
    ['http://moe.hao123.com', 'moe-hao123-com', 1440, 820],
    ['http://v.hao123.com/dongman', 'v-hao123-com-dongman', 1440, 820],
    ['https://www.bilibili.com', 'www-bilibili-com', 1440, 820],
    ['http://www.zhihu.com', 'www-zhihu-com', 1440, 820],
    ['https://www.ximalaya.com', 'www-ximalaya-com', 1440, 820],
    ['https://p.yiqifa.org/5WB6Sl', 'p-yiqifa-org-5WB6Sl', 1440, 820],
    ['http://www.huya.com', 'www-huya-com', 1440, 820],
    ['http://caipiao.hao123.com', 'caipiao-hao123-com', 1440, 820],
    ['https://www.chsi.com.cn', 'www-chsi-com-cn', 1440, 820],
    ['https://music.163.com', 'music-163-com', 1440, 820],
    ['https://www.douban.com', 'www-douban-com', 1440, 820],
    ['http://www.icbc.com.cn/icbc', 'www-icbc-com-cn-icbc', 1440, 820],
    ['http://www.tianya.cn', 'www-tianya-cn', 1440, 820],
    ['https://mail.qq.com', 'mail-qq-com', 1440, 820],
    ['https://www.zhibo8.cc', 'www-zhibo8-cc', 1440, 820],
    ['https://v.qq.com', 'v-qq-com', 1440, 820],
    ['https://haokan.baidu.com', 'haokan-baidu-com', 1440, 820],
    ['http://www.iqiyi.com', 'www-iqiyi-com', 1440, 820],
    ['http://www.youku.com', 'www-youku-com', 1440, 820],
    ['http://v.qq.com', 'v-qq-com', 1440, 820],
    ['http://www.mgtv.com', 'www-mgtv-com', 1440, 820],
    ['http://www.hao123.com/video/zixun','www-hao123-com-video-zixun',1440,820] ,
    ['http://www.acfun.cn', 'www-acfun-cn', 1440, 820],
    ['http://www.hao123.com/manhua', 'www-hao123-com-manhua', 1440, 820],
    ['http://moe.hao123.com', 'moe-hao123-com', 1440, 820],
    ['http://v.hao123.baidu.com/dongman', 'v-hao123-baidu-com-dongman', 1440, 820] ,
    ['http://news.sina.com.cn', 'news-sina-com-cn', 1440, 820],
    ['http://www.qq.com', 'www-qq-com', 1440, 820],
    ['https://www.guancha.cn', 'www-guancha-cn', 1440, 820],
    ['http://news.sohu.com', 'news-sohu-com', 1440, 820],
    ['http://www.cankaoxiaoxi.com', 'www-cankaoxiaoxi-com', 1440, 820],
    ['http://www.huanqiu.com', 'www-huanqiu-com', 1440, 820],
    ['https://junshi.china.com/qd/haokz/top', 'junshi-china-com-qd-haokz-top', 1440, 820] ,
    ['http://news.ifeng.com/mil', 'news-ifeng-com-mil', 1440, 820],
    ['http://www.miercn.com', 'www-miercn-com', 1440, 820],
    ['https://tuijian.hao123.com', 'tuijian-hao123-com', 1440, 820],
    ['http://www.4399.com', 'www-4399-com', 1440, 820],
    ['http://www.7k7k.com', 'www-7k7k-com', 1440, 820],
    ['http://www.17173.com', 'www-17173-com', 1440, 820],
    ['http://www.37.com', 'www-37-com', 1440, 820],
    ['http://www.gamersky.com', 'www-gamersky-com', 1440, 820],
    ['http://www.hao123.com/zt/lol1', 'www-hao123-com-zt-lol1', 1440, 820] ,
    ['https://www.ali213.net', 'www-ali213-net', 1440, 820],
    ['https://game.hao123.com', 'game-hao123-com', 1440, 820],
    ['http://www.dangdang.com', 'www-dangdang-com', 1440, 820],
    ['https://www.taobao.com', 'www-taobao-com', 1440, 820],
    ['http://www.mogujie.com', 'www-mogujie-com', 1440, 820],
    ['https://www.1688.com', 'www-1688-com', 1440, 820],
    ['https://www.ctrip.com', 'www-ctrip-com', 1440, 820],
    ['http://www.elong.com', 'www-elong-com', 1440, 820],
    ['https://www.12306.cn', 'www-12306-cn', 1440, 820],
    ['http://www.mafengwo.cn', 'www-mafengwo-cn', 1440, 820],
    ['http://www.tuniu.com', 'www-tuniu-com', 1440, 820],
    ['http://www.qyer.com', 'www-qyer-com', 1440, 820],
    ['http://www.lvmama.com', 'www-lvmama-com', 1440, 820],
    ['https://www.ly.com', 'www-ly-com', 1440, 820],
    ['http://sports.sina.com.cn', 'sports-sina-com-cn', 1440, 820],
    ['http://sports.sohu.com', 'sports-sohu-com', 1440, 820],
    ['http://sports.cntv.cn', 'sports-cntv-cn', 1440, 820],
    ['https://www.hupu.com', 'www-hupu-com', 1440, 820],
    ['http://www.zhibo8.cc', 'www-zhibo8-cc', 1440, 820],
    ['http://sports.163.com', 'sports-163-com', 1440, 820],
    ['http://sports.qq.com', 'sports-qq-com', 1440, 820],
    ['http://sports.ifeng.com', 'sports-ifeng-com', 1440, 820],
    ['http://www.dongqiudi.com', 'www-dongqiudi-com', 1440, 820],
    ['http://www.hao123.com/sports', 'www-hao123-com-sports', 1440, 820],
    ['http://www.qidian.com', 'www-qidian-com', 1440, 820],
    ['https://b.faloo.com', 'b-faloo-com', 1440, 820],
    ['http://www.xxsy.net', 'www-xxsy-net', 1440, 820],
    ['http://book.hao123.com/rank.html', 'book-hao123-com-rank-html', 1440, 820] ,
    ['http://www.readnovel.com', 'www-readnovel-com', 1440, 820],
    ['http://www.jjwxc.net', 'www-jjwxc-net', 1440, 820],
    ['http://www.lrts.me', 'www-lrts-me', 1440, 820],
    ['http://www.zongheng.com', 'www-zongheng-com', 1440, 820],
    ['https://www.ximalaya.com', 'www-ximalaya-com', 1440, 820],
    ['http://www.zol.com.cn', 'www-zol-com-cn', 1440, 820],
    ['http://mobile.pconline.com.cn', 'mobile-pconline-com-cn', 1440, 820] ,
    ['http://www.ithome.com', 'www-ithome-com', 1440, 820],
    ['http://www.10086.cn', 'www-10086-cn', 1440, 820],
    ['http://soft.hao123.com', 'soft-hao123-com', 1440, 820],
    ['http://www.onlinedown.net', 'www-onlinedown-net', 1440, 820],
    ['https://shouji.baidu.com', 'shouji-baidu-com', 1440, 820],
    ['http://www.mi.com', 'www-mi-com', 1440, 820],
    ['https://www.vmall.com', 'www-vmall-com', 1440, 820],
    ['https://www.apple.com/cn', 'www-apple-com-cn', 1440, 820],
    ['http://www.jiayuan.com', 'www-jiayuan-com', 1440, 820],
    ['http://www.zhenai.com', 'www-zhenai-com', 1440, 820],
    ['http://www.baihe.com', 'www-baihe-com', 1440, 820],
    ['http://www.tianya.cn', 'www-tianya-cn', 1440, 820],
    ['http://www.mop.com', 'www-mop-com', 1440, 820],
    ['http://qzone.qq.com', 'qzone-qq-com', 1440, 820],
    ['https://www.zhihu.com', 'www-zhihu-com', 1440, 820],
    ['https://www.douban.com', 'www-douban-com', 1440, 820],
    ['https://www.douyu.com', 'www-douyu-com', 1440, 820],
    ['https://www.yy.com', 'www-yy-com', 1440, 820],
    ['https://egame.qq.com', 'egame-qq-com', 1440, 820],
    ['http://www.ganji.com', 'www-ganji-com', 1440, 820],
    ['https://www.anjuke.com', 'www-anjuke-com', 1440, 820],
    ['http://www.fang.com', 'www-fang-com', 1440, 820],
    ['http://www.lianjia.com', 'www-lianjia-com', 1440, 820],
    ['http://www.baixing.com', 'www-baixing-com', 1440, 820],
    ['http://www.xiachufang.com', 'www-xiachufang-com', 1440, 820],
    ['http://www.dianping.com', 'www-dianping-com', 1440, 820],
    ['https://www.tianyancha.com', 'www-tianyancha-com', 1440, 820],
    ['https://www.hc360.com', 'www-hc360-com', 1440, 820],
    ['https://www.58pic.com', 'www-58pic-com', 1440, 820],
    ['https://www.ximalaya.com', 'www-ximalaya-com', 1440, 820],
    ['https://www.csdn.net', 'www-csdn-net', 1440, 820],
    ['http://dict.youdao.com', 'dict-youdao-com', 1440, 820],
    ['https://manhua.dmzj.com', 'manhua-dmzj-com', 1440, 820],
    ['https://ac.qq.com', 'ac-qq-com', 1440, 820],
    ['http://www.pbccrc.org.cn', 'www-pbccrc-org-cn', 1440, 820],
    ['https://www.docin.com', 'www-docin-com', 1440, 820],
    ['https://www.aizhan.com', 'www-aizhan-com', 1440, 820],
    ['http://www.51job.com', 'www-51job-com', 1440, 820],
    ['https://www.liepin.com', 'www-liepin-com', 1440, 820],
    ['http://www.yingjiesheng.com', 'www-yingjiesheng-com', 1440, 820],
    ['http://www.chinahr.com', 'www-chinahr-com', 1440, 820],
    ['https://www.lagou.com', 'www-lagou-com', 1440, 820],
    ['https://www.dajie.com', 'www-dajie-com', 1440, 820],
    ['https://www.zhipin.com', 'www-zhipin-com', 1440, 820],
    ['https://www.shixiseng.com', 'www-shixiseng-com', 1440, 820],
    ['https://www.kanzhun.com', 'www-kanzhun-com', 1440, 820],
    ['http://www.gaoxiaojob.com', 'www-gaoxiaojob-com', 1440, 820],
    ['http://www.pcauto.com.cn', 'www-pcauto-com-cn', 1440, 820],
    ['http://www.bitauto.com', 'www-bitauto-com', 1440, 820],
    ['http://www.hao123.com/auto', 'www-hao123-com-auto', 1440, 820],
    ['http://auto.sina.com.cn', 'auto-sina-com-cn', 1440, 820],
    ['http://www.jxedt.com', 'www-jxedt-com', 1440, 820],
    ['http://auto.ifeng.com', 'auto-ifeng-com', 1440, 820],
    ['http://www.xcar.com.cn', 'www-xcar-com-cn', 1440, 820],
    ['http://auto.sohu.com', 'auto-sohu-com', 1440, 820],
    ['http://auto.qq.com', 'auto-qq-com', 1440, 820],
    ['http://www.kugou.com', 'www-kugou-com', 1440, 820],
    ['http://music.163.com', 'music-163-com', 1440, 820],
    ['http://y.qq.com', 'y-qq-com', 1440, 820],
    ['http://www.xiami.com', 'www-xiami-com', 1440, 820],
    ['http://www.yinyuetai.com', 'www-yinyuetai-com', 1440, 820],
    ['http://www.kuwo.cn', 'www-kuwo-cn', 1440, 820],
    ['http://changba.com', 'changba-com', 1440, 820],
    ['http://www.eastmoney.com', 'www-eastmoney-com', 1440, 820],
    ['http://finance.sina.com.cn', 'finance-sina-com-cn', 1440, 820],
    ['http://www.stockstar.com', 'www-stockstar-com', 1440, 820],
    ['http://www.cnfol.com', 'www-cnfol-com', 1440, 820],
    ['http://finance.ifeng.com', 'finance-ifeng-com', 1440, 820],
    ['http://www.jrj.com.cn', 'www-jrj-com-cn', 1440, 820],
    ['http://www.hexun.com', 'www-hexun-com', 1440, 820],
    ['http://xueqiu.com', 'xueqiu-com', 1440, 820],
    ['http://guba.eastmoney.com', 'guba-eastmoney-com', 1440, 820],
    ['https://www.yicai.com', 'www-yicai-com', 1440, 820],
    ['http://www.p5w.net', 'www-p5w-net', 1440, 820],
    ['http://www.zhcw.com', 'www-zhcw-com', 1440, 820],
    ['http://www.lottery.gov.cn', 'www-lottery-gov-cn', 1440, 820],
    ['http://caipiao.hao123.com', 'caipiao-hao123-com', 1440, 820],
    ['http://lottery.sina.com.cn', 'lottery-sina-com-cn', 1440, 820],
    ['http://www.sporttery.cn', 'www-sporttery-cn', 1440, 820],
    ['http://www.cwl.gov.cn', 'www-cwl-gov-cn', 1440, 820],
    ['http://caipiao.sohu.com', 'caipiao-sohu-com', 1440, 820],
    ['http://caipiao.163.com', 'caipiao-163-com', 1440, 820],
    ['http://www.okooo.com', 'www-okooo-com', 1440, 820],
    ['http://zx.500.com', 'zx-500-com', 1440, 820],
    ['http://www.icbc.com.cn', 'www-icbc-com-cn', 1440, 820],
    ['http://www.ccb.com', 'www-ccb-com', 1440, 820],
    ['http://www.abchina.com', 'www-abchina-com', 1440, 820],
    ['http://www.boc.cn', 'www-boc-cn', 1440, 820],
    ['http://www.bankcomm.com', 'www-bankcomm-com', 1440, 820],
    ['http://www.cmbchina.com', 'www-cmbchina-com', 1440, 820],
    ['https://www.alipay.com', 'www-alipay-com', 1440, 820],
    ['http://www.pbc.gov.cn', 'www-pbc-gov-cn', 1440, 820],
    ['https://www.cib.com.cn/cn/index.html', 'www-cib-com-cn-cn-index-html', 1440, 820] ,
    ['http://www.spdb.com.cn', 'www-spdb-com-cn', 1440, 820],
    ['http://mail.163.com', 'mail-163-com', 1440, 820],
    ['http://mail.126.com', 'mail-126-com', 1440, 820],
    ['http://mail.aliyun.com', 'mail-aliyun-com', 1440, 820],
    ['http://mail.sina.com.cn', 'mail-sina-com-cn', 1440, 820],
    ['http://mail.qq.com', 'mail-qq-com', 1440, 820],
    ['http://mail.10086.cn', 'mail-10086-cn', 1440, 820],
    ['https://outlook.live.com', 'outlook-live-com', 1440, 820],
    ['https://mail.sohu.com', 'mail-sohu-com', 1440, 820],
    ['https://pan.baidu.com', 'pan-baidu-com', 1440, 820],
];

const COL1_WIDTH = 30;
const COL_WIDTH = 10;
const DIFF_COL_WIDTH = 15;
function tableHead() {
    const col11 = ''.padEnd(COL1_WIDTH);
    const col12 = 'pespeed'.padEnd(COL_WIDTH);
    const col13 = 'speed'.padEnd(COL_WIDTH);
    const col14 = 'perceptual'.padEnd(COL_WIDTH);
    const col21 = 'url'.padEnd(COL1_WIDTH);
    const col22 = 'Index'.padEnd(COL_WIDTH);
    const col23 = 'Index'.padEnd(COL_WIDTH);
    const col24 = 'SpeedIndex'.padEnd(COL_WIDTH);
    const diff1 = ''.padEnd(DIFF_COL_WIDTH);
    const diff2 = 'diff'.padEnd(DIFF_COL_WIDTH);
    const line1 = ''.padEnd(COL1_WIDTH, '-');
    const line = ''.padEnd(COL_WIDTH, '-');
    const lineDiff = ''.padEnd(DIFF_COL_WIDTH, '-');
    console.log(`${col11} ${col12} ${col13} ${diff1} ${col14} ${diff1}`);
    console.log(`${col21} ${col22} ${col23} ${diff2} ${col24} ${diff2}`);
    console.log(`${line1} ${line} ${line} ${lineDiff} ${line} ${lineDiff}`);

}

function diffTD(v1: number, v2: number): string {
    const redBg = '\x1b[40m\x1b[41m';
    const greenBg = '\x1b[40m\x1b[42m';
    const grayBg = '\x1b[40m\x1b[100m';
    const bgEnd = '\x1b[0m';
    const value = v1 - v2;
    let ratio = v2 === 0 ? '0' : (value * 100 / v2).toFixed(0);
    let temp = value.toFixed(0);
    if (value > 0) {
        ratio = '(' + ratio.padStart(ratio.length + 1, '+') + '%)';
        temp = temp.padStart(temp.length + 1, '+').padEnd(DIFF_COL_WIDTH - ratio.length) + ratio;
        return redBg + temp + bgEnd;
    } else if (value < 0) {
        ratio = '(' + ratio + '%)';
        temp = temp.padEnd(DIFF_COL_WIDTH - ratio.length) + ratio;
        return greenBg + temp + bgEnd;
    } else {
        ratio = '(' + ratio + '%)';
        temp = temp.padEnd(DIFF_COL_WIDTH - ratio.length) + ratio;
        return grayBg + temp + bgEnd;
    }
}

function row(url: string, pespeedIndex: number = 0, speedIndex: number = 0, perceptualSpeedIndex: number = 0) {
    if (url.length <= COL1_WIDTH) {
        url = url.padEnd(COL1_WIDTH);
    } else {
        url = url.substr(0, COL1_WIDTH - 3) + '...';
    }
    
    
    const pespeedIndexStr = pespeedIndex?.toFixed(0).padEnd(COL_WIDTH);
    const speedIndexStr = speedIndex?.toFixed(0).padEnd(COL_WIDTH);
    const speedIndexDiff = diffTD(pespeedIndex, speedIndex);
    const perceptualSpeedIndexStr = perceptualSpeedIndex?.toFixed(0).padEnd(COL_WIDTH);
    const perceptualSpeedIndexDiff = diffTD(pespeedIndex, perceptualSpeedIndex);
    console.log(`${url} ${pespeedIndexStr} ${speedIndexStr} ${speedIndexDiff} ${perceptualSpeedIndexStr} ${perceptualSpeedIndexDiff}`);
}

const run = async () => {
    const opts: Options<speedline.IncludeType> = {};
    tableHead();
    for (const [url, id, width, height] of benchmarkData) {
        const timeline = path.join(__dirname, '../test/assets/' + id + '.json');
        const results = await speedline(timeline, opts);
        const pespeedIndex = paintEventsSpeedIndex(timeline, <number>width,<number>height).speedIndex;
        const speedIndex = results.speedIndex;
        const perceptualSpeedIndex = results.perceptualSpeedIndex;
        row(<string>url, pespeedIndex, speedIndex, perceptualSpeedIndex);
    }
};

run().then(()=>{
    console.log('done!');
});

