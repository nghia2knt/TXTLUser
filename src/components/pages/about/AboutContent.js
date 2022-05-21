import { Typography } from "@material-ui/core";
import React, { useState } from "react";

import "./AboutContent.scss";

const AboutContent = () => {

  return (
    <div id="aboutContent">
                <h2>GIỚI THIỆU</h2>
                <h3>CÔNG TY TNHH IUH - CHUYÊN CHO THUÊ XE TẬP LÁI</h3>
                <br></br>
                <Typography>
                Địa chỉ: 12 Nguyễn Văn Bảo, Gò Vấp, Hồ Chí Minh
                </Typography>
                <Typography>
                Số điện thoại: 0388308155
                </Typography>
            
                <img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg"></img>
                <br></br>
                <br></br>

                <h3>VỀ CÔNG TY</h3>

                <Typography>

            Là doanh nghiệp tri thức luôn tiên phong trong lĩnh vực tư vấn tuyển sinh đào tạo lái xe 
            và giáo dục định hướng tại Việt Nam, TXTL luôn hướng đến những giá trị của con người để 
            thành công và thành đạt trong cuộc sống. Sau nhiều năm triển khai phát triển hoạt động tư vấn học
            lái xe với cơ sở vật chất hiện đại và đội ngũ chuyên viên tư vấn lành nghề, tận tâm và uy tín, 
            Chúng tôi tự hào là một địa chỉ tin cậy cho nhiều học viên muốn có tấm bằng lái xe ô tô và bổ túc tay lái 
            thực tế an toàn trên mọi nẻo đường, song song với viêc nâng cao kỹ năng và kiến thức về pháp luật an toàn giao thông.

            </Typography>
            <Typography>
            Với mục tiêu đó, chúng tôi luôn cố gắng không ngừng học hỏi tiếp thu ý kiến đóng góp để ngày càng hoàn thiện hơn trong việc mang lại cho học viên các khóa đào tạo học lái xe ô tô với 4 tiêu chí:
            1. Học lái xe nhanh có bằng nhưng vẫn đầy đủ kiến thức về lái xe, về luật lệ.
            2. Học lái xe chi phí thấp, trọn gói, cam kết không phát sinh thêm chi phí nào khác.
            3. Kỹ năng lái xe và tinh thần đạo đức tốt nhất.
            4. Thời gian học lái xe ô tô linh động nhất
            </Typography>
    </div>
  );
};

export default AboutContent;
