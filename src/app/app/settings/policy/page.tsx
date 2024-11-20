'use client';

import * as React from 'react';

import Link from 'next/link';

import { ChevronLeft } from 'akar-icons';

import { NKRouter } from '@/core/NKRouter';
import { IV1ChangePasswordDto } from '@/core/api/user-me.api';

interface PageProps {}

interface ChangePasswordForm extends IV1ChangePasswordDto {
    confirmPassword: string;
}

const Page: React.FC<PageProps> = () => {
    return (
        <div className="fade-in flex w-full flex-1 flex-col bg-white">
            <div className="flex-1 p-4  ">
                <div className="flex items-center justify-between">
                    <Link href={NKRouter.app.settings.index()} className="">
                        <div>
                            <ChevronLeft strokeWidth={2} size={24} />
                        </div>
                    </Link>
                    <div className=" flex-1 text-center text-2xl font-bold">Điều khoản dịch vụ</div>
                    <div className=""></div>
                </div>
                <div className="mt-4 text-justify">
                    2. QUYỀN RIÊNG TƯ 2.1 Shopee coi trọng việc bảo mật thông tin của bạn. Để bảo vệ quyền lợi người dùng, Shopee cung cấp Chính Sách
                    Bảo Mật để giải thích chi tiết các hoạt động bảo mật của Shopee. Vui lòng tham khảo Chính Sách Bảo Mật để biết cách thức Shopee
                    thu thập và sử dụng thông tin liên quan đến Tài Khoản và/hoặc việc sử dụng Dịch Vụ của Người Sử Dụng (“Thông Tin Người Sử Dụng”).
                    Điều Khoản Dịch Vụ này có liên quan mật thiết với Chính Sách Bảo Mật. Bằng cách sử dụng Dịch Vụ hoặc cung cấp thông tin trên Trang
                    Shopee, Người Sử Dụng: a. cho phép Shopee thu thập, sử dụng, công bố và/hoặc xử lý các Nội Dung, dữ liệu cá nhân của bạn và Thông
                    Tin Người Sử Dụng như được quy định trong Chính Sách Bảo Mật; b. đồng ý và công nhận rằng các thông tin được cung cấp trên Trang
                    Shopee sẽ thuộc sở hữu chung của bạn và Shopee; và c. sẽ không, dù là trực tiếp hay gián tiếp, tiết lộ các Thông Tin Người Sử Dụng
                    cho bất kỳ bên thứ ba nào, hoặc bằng bất kỳ phương thức nào cho phép bất kỳ bên thứ ba nào được truy cập hoặc sử dụng Thông Tin
                    Người Dùng của bạn. 2.2 Trường hợp Người Sử Dụng sở hữu dữ liệu cá nhân của Người Sử Dụng khác thông qua việc sử dụng Dịch Vụ
                    (“Bên Nhận Thông Tin”) theo đây đồng ý rằng, mình sẽ (i) tuân thủ mọi quy định pháp luật về bảo vệ an toàn thông tin cá nhân liên
                    quan đến những thông tin đó; (ii) cho phép Người Sử Dụng là chủ sở hữu của các thông tin cá nhân mà Bên Nhận Thông Tin thu thập
                    được (“Bên Tiết Lộ Thông Tin”) được phép xóa bỏ thông tin của mình được thu thập từ cơ sở dữ liệu của Bên Nhận Thông Tin; và (iii)
                    cho phép Bên Tiết Lộ Thông Tin rà soát những thông tin đã được thu thập về họ bởi Bên Nhận Thông Tin, phù hợp với hoặc theo yêu
                    cầu của các quy định pháp luật hiện hành.
                </div>
                <div>
                    Yêu cầu về độ tuổi Nếu chưa đủ tuổi để tự quản lý Tài khoản Google theo quy định, bạn phải được cha mẹ hoặc người giám hộ hợp pháp
                    cho phép thì mới có thể sử dụng Tài khoản Google. Vui lòng yêu cầu cha mẹ hoặc người giám hộ hợp pháp cùng bạn đọc các điều khoản
                    này. Nếu bạn là cha mẹ hoặc người giám hộ hợp pháp và bạn cho phép con bạn sử dụng các dịch vụ này, thì bạn phải tuân theo các
                    điều khoản này và chịu trách nhiệm đối với hoạt động của con bạn trong các dịch vụ đó. Một số dịch vụ của Google có các yêu cầu bổ
                    sung về độ tuổi như mô tả trong các chính sách và điều khoản bổ sung dành riêng cho từng dịch vụ.
                </div>
                <div>
                    Bất kỳ phần mềm nào được cung cấp bởi Shopee tới Người Sử Dụng đều thuộc phạm vi điều chỉnh của các Điều Khoản Dịch Vụ này. Shopee
                    bảo lưu tất cả các quyền liên quan đến phần mềm không được cấp một các rõ ràng bởi Shopee theo đây. Bất kỳ tập lệnh hoặc mã code,
                    liên kết đến hoặc dẫn chiếu từ Dịch Vụ, đều được cấp phép cho bạn bởi các bên thứ ba là chủ sở hữu của tập lệnh hoặc mã code đó
                    chứ không phải bởi Shopee.
                </div>
            </div>
        </div>
    );
};

export default Page;
