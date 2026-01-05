---
title: "Makeshift Postmortem"
date: "2026-01-05"
excerpt: "Afterthoughts and stuff"
coverImage: "https://img.itch.zone/aW1nLzI0MDkxODAyLnBuZw==/315x250%23c/yf5%2Fc8.png"
tags: ["gamedev", "postmortem", "vietnamese"]
---

![](https://img.itch.zone/aW1nLzI0MDkyMDg4LnBuZw==/original/0Zj%2FgM.png)

# prelude

[Makeshift](https://phaspez.itch.io/makeshift) gần được 700 lượt chơi và hơn 1.5K lượt view. Quả là một thành tựu to lớn so với người vô danh mặc dày đi
shameless promotion trên mọi trang MXH. Chắc nên viết một cái gì đó để flex:) Cái game đàng quàng lần trước cũng từ 2023 rồi, giờ chắc phải trả lời cho
câu hỏi, 'em có thể giải thích cho cái gap 2 năm của em trong CV được hong?'

Khoảng thời gian đó tui cũng có dọc mấy game khác, nhưng mà cảm thấy không vui lắm nên dừng làm tiếp, đáng lẽ tính ra mấy game platformer lỏ lỏ mình làm từ
hồi cấp 3 thì cũng có thể khoe '5 năm kinh nghiệm gamedev' rồi nhỉ, hồi đó xài toàn đồ cổ đại, PyGame, JavaScript, rồi cuối cùng xài Godot 3.1. Gần đây tui
cảm thấy burn out và chỉ muốn ra trường cho lẹ, _as ASAP as possible_, có vẻ như có một từ tiếng Anh để biểu diễn trạng thái này, **_Senioritis_**, và tui
muốn làm cái gì đó vui vui một chút, dạo này cũng hơi chán ngấy trend AI, bộ app CRUD lỏ lỏ nào của sv cũng phải AI feature vô mới cập nhật thời đại sao.

Tình cờ lướt trang jam trên itch.io thấy có vài jam cũng nổi nổi. Mình thích jam có nhiều người tham gia, nhưng không _quá_ nhiều người tham gia. Mấy jam
tự phát có quá ít người, còn GMTK này nọ thì quá đông như phải gào hét rao bán game mình ngoài chợ. Khoảng vài K thì rất là perfect, thấy có
[20 Second Game Jam 2025](https://itch.io/jam/20-second-game-jam-2025) và [GitHub Game Off 2025](https://itch.io/jam/game-off-2025) cũng gần cùng thời điểm.
Mình chọn 20SGJ vì đây là game jam đầu tiên mình tham gia, cũng như ít ràng buộc về theme và rating hơn.

Tiếc thay sau khi làm xong game jam thấy có [thatgamejam](https://itch.io/jam/thatgamejam01) cũng vui nữa của studio đã làm Sky: Children of the Light. Mà thôi tham
quá:)))

# the making of Makeshift

[![Makeshift Trailer](https://img.youtube.com/vi/AQuvjgcsmOc/0.jpg)](https://www.youtube.com/watch?v=AQuvjgcsmOc)

Có một game hồi nhỏ mình có chơi là OLDTV và mấy game kiểu puzzle hack não cũng hay. Ví dụ chữ YELLOW màu xanh lam, trả lời nhanh chữ có khớp màu không. Ý
tưởng là thay vì chữ... MŨI TÊN thì xao??? xD

Technical implementation thì không có gì khó và đặc sắc lắm, có panel mũi tên với mấy ô đặc biệt để thay đổi chiều, xong so sánh của người chơi với nguyên cái
pipeline này. Mình làm trước mỗi promt sẽ có những panel thế nào, xong game sẽ randomize thứ tự của panel và pick ngẫu nhiên với độ khó tăng dần.

![](/images/5/arch.png)

Phần mình làm leaderboard có một [blog](https://mintram.id.vn/blog/leaderboard-with-supabase) riêng cũng hay ho.

Về theme mình muốn trong game này làm kiểu terminal hacking giống hollywood này nọ, đi scrape data từ mọi data center. Tui iu JetBrains Mono.
Điều khiển mọi thứ xài bàn phím hết.

Khá nhiều người comment về juice và design. Mình xài cả tấn shader và fx cho cái game này, có thể kể tới như lens effect, particle, vignette, CRT và FBM
noise. Rất nhiều chuyển động trong game chỉ toàn xài Tween. Mọi UI trong game chỉ là Label node và text mà thôi:) ngay cả mấy cái như progress bar mình
kiếm mã Unicode phù hợp để gán.

Sau khi mình đăng game thì mình đã làm theo rất nhiều feedback người chơi đưa. Patch đầu là khi thua thay vì cho Retry/Menu là hướng mũi tên luôn thì bind
tới Space/Enter để tránh ấn lộn, cùng kim và ngược kim đồng hồ có màu hơi khác. Patch thứ hai là giảm độ khó cho game, dù hiện tại game vẫn khó vl:) Trước
đó một màn có 20 prompt và mỗi perfect cộng thêm 0.8s, giờ chỉ có 17 và perfect cho 0.9s, ngoài ra có promt Hán tự nhiều người thấy cấn nên mình thay bằng
shape đơn giản hơn, và có leaderboard sau lần này. Patch cuối mình làm thêm chế độ Endless, mấy màn thêm với mấy tùy chọn cài đặt.

Thế có thể là xong cho một game jam:) Thật ra mình không gặp nhiều trở ngại lắm trong quá trình làm. Ngoài việc bị TNGT và bị bong gân bàn chân tới giờ còn
hơi ê. Giờ nghĩ lại có thể control hơi lấn cấn một xíu. Thay vì Enter để chọn thì mình bind để mở Leaderboard. Mục đích là vì mình muốn navigation dùng
mũi tên luôn.

Sau cùng mình có đăng cái game soundtrack ở [đây](https://www.youtube.com/watch?v=hGX7ej2oC5s). Khá thích track của level 4:)

## future

Mình chưa có plan nhiều cho game này lắm nhưng khá nhiều người đã hỏi có trên Xì Tim chưa. Chắc là mình sẽ tham dụ tiếp mấy game jam khác để aura farming,
nào đủ trình chắc sẽ release gì đó chăng:v

mintram.
