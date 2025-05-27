from flask import Flask, session, redirect, url_for, request, jsonify
import mysql.connector
import os
from dotenv import load_dotenv
from flask_cors import CORS  

app = Flask(__name__)
app.secret_key = 'some_secret_key'
CORS(app, supports_credentials=True, origins=["http://localhost:3000"], methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# Cấu hình session và cookie
app.config['SECRET_KEY'] = 'your_secret_key'  # Đảm bảo có khóa bí mật
app.config['SESSION_COOKIE_NAME'] = 'my_session_cookie'
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Cho phép gửi cookie giữa các miền
app.config['SESSION_COOKIE_SECURE'] = False  # Đặt True nếu bạn sử dụng HTTPS

# Kết nối với cơ sở dữ liệu MySQL
def get_db_connection():
    # Kiểm tra giá trị biến môi trường
    host = os.getenv("MYSQL_HOST")
    port = int(os.getenv("MYSQL_PORT"))
    user = os.getenv("MYSQL_USER")
    password = os.getenv("MYSQL_PASSWORD")
    database = os.getenv("MYSQL_DATABASE")

    print(f"Connecting to database at {host}:{port} with user {user}")
    
    # Kết nối tới cơ sở dữ liệu
    connection = mysql.connector.connect(
        host=host,
        port=port,
        user=user,
        password=password,
        database=database,
        ssl_disabled=False  # Hoặc thử thay False bằng True nếu cần
    )
    return connection

@app.route('/dangnhap', methods=['POST'])
def dangnhap():
    email = request.json.get('email')
    mat_khau = request.json.get('mat_khau')

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT tai_khoan.id, tai_khoan.mat_khau, khach_hang.ho_ten, khach_hang.so_dien_thoai
        FROM tai_khoan
        JOIN khach_hang ON tai_khoan.id = khach_hang.id
        WHERE tai_khoan.email = %s
        """
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        if user and user['mat_khau'] == mat_khau:
            session['user_id'] = user['id']
            session['ho_ten'] = user['ho_ten']
            print(">>> Session set:", dict(session)) 
            return jsonify({"message": "Đăng nhập thành công", "redirect": "/"})
        else:
            return jsonify({"error": "Đăng nhập không thành công"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/check-session', methods=['GET'])
def check_session():
    if 'user_id' in session:
        return jsonify({
            "user_id": session['user_id'],
            "ho_ten": session['ho_ten']
        })
    else:
        return jsonify({"message": "No session found"}), 200

@app.route('/logout', methods=['POST'])
def logout():
    print(">>> Logout route called")  # Để kiểm tra nếu route được gọi
    session.clear()  # Xóa session
    return jsonify({"message": "Logged out successfully"}), 200

@app.route('/get_products', methods=['GET'])
def get_all_products():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Truy vấn tất cả sản phẩm
        query = """
        SELECT ten_san_pham, gia, mo_ta, hinh_anh
        FROM san_pham
        """
        cursor.execute(query)
        products = cursor.fetchall()

        # Kiểm tra nếu có sản phẩm
        if not products:
            return jsonify({"message": "No products found."}), 404

        cursor.close()
        connection.close()

        # Cập nhật tên file hình ảnh thành đường dẫn URL (giả sử bạn có thư mục chứa hình ảnh)
        for product in products:
            product['hinh_anh'] = f"http://localhost:5000/images/{product['hinh_anh']}"

        return jsonify(products)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_products/<string:category>', methods=['GET'])
def get_products_by_category(category):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Truy vấn dữ liệu sản phẩm theo ma_danh_muc
        query = """
        SELECT ten_san_pham, gia, mo_ta, hinh_anh
        FROM san_pham
        WHERE ma_danh_muc = %s
        """
        cursor.execute(query, (category,))
        products = cursor.fetchall()
        
        # Kiểm tra nếu có sản phẩm
        if not products:
            return jsonify({"message": "No products found for this category."}), 404

        cursor.close()
        connection.close()

        # Cập nhật tên file hình ảnh thành đường dẫn URL (giả sử bạn có thư mục chứa hình ảnh)
        for product in products:
            product['hinh_anh'] = f"http://localhost:5000/images/{product['hinh_anh']}"

        return jsonify(products)

    except Exception as e:
        # Nếu có lỗi kết nối cơ sở dữ liệu hoặc lỗi khác
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/customers', methods=['GET'])
def get_customers():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        query = "SELECT id, anh AS avatar, ho_ten AS name, so_dien_thoai AS phone, email, ngay_tao AS dateTime, trang_thai as trangthai FROM khach_hang"
        cursor.execute(query)
        customers = cursor.fetchall()

        cursor.close()
        connection.close()

        # Bổ sung đường dẫn hình ảnh nếu cần
        for cust in customers:
            if cust['avatar']:
                cust['avatar'] = f"http://localhost:5000/images/{cust['avatar']}"
            else:
                cust['avatar'] = f"http://localhost:5000/images/avatar.png"

        return jsonify(customers)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/customers/<id>/deactivate', methods=['PUT', 'OPTIONS'])
def deactivate_customer(id):
    if request.method == 'OPTIONS':
        return '', 200  # Phản hồi OK cho preflight request

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        query = """
            UPDATE khach_hang 
            SET trang_thai = CASE
                WHEN trang_thai = 'Ngưng hoạt động' THEN 'Đang hoạt động'
                ELSE 'Ngưng hoạt động'
            END
            WHERE id = %s
        """
        cursor.execute(query, (id,))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Customer deactivated"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    

@app.route('/api/employees', methods=['GET'])
def get_employees():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT 
            idnv AS id, 
            anh AS avatar, 
            ho_ten AS name, 
            so_dien_thoai AS phone, 
            ngay_bat_dau AS dateTime,
            trang_thai AS trangthaiNV
        FROM nhan_vien
        """
        cursor.execute(query)
        employees = cursor.fetchall()

        cursor.close()
        connection.close()

        # Bổ sung đường dẫn hình ảnh nếu có
        for emp in employees:
            if emp['avatar']:
                emp['avatar'] = f"http://localhost:5000/images/{emp['avatar']}"
            else:
                emp['avatar'] = f"http://localhost:5000/images/avatar.png"

        return jsonify(employees)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/employees/<id>/deactivate', methods=['PUT', 'OPTIONS'])
def deactivate_employee(id):
    if request.method == 'OPTIONS':
        return '', 200  # Phản hồi OK cho preflight request

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        query = """
            UPDATE nhan_vien 
            SET trang_thai = CASE
                WHEN trang_thai = 'Ngưng hoạt động' THEN 'Đang hoạt động'
                ELSE 'Ngưng hoạt động'
            END
            WHERE idnv = %s
        """
        cursor.execute(query, (id,))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Employee deactivated"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)  # Đảm bảo chạy trên tất cả các IP
