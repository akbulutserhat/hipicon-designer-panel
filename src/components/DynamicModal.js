import Barcode from '../assets/barcode_v4.png'
import Printer from '../assets/print.ico'
import Yurtici from '../assets/yk.png'

const DynamicModal = ({closeModal,isCargoModal,isOrderModal,isEditPage
    ,handleChange,handleSubmit,rowData,largeModal}) => {

    const cargoModal = (
        <div className="row w-100 h-100 m-0">
            <div className="left-side col-9 mt-4">
                <span className="subtitle">Gönderi Takip Numarası:</span>
                <div className="left-body mt-3">
                    <div className="list-card mb-4">
                    <span className="list-number mr-3">1</span><span className="date-text">{rowData.date} -</span> {rowData.cargo} numaralı kargo anahtarı için barcode oluşturuldu
                    </div>
                    <div className="list-card mb-4">
                    <span className="list-number mr-3">2</span><span className="date-text">{rowData.date} -</span> {rowData.cargo} numaralı kargo anahtarı için barcode oluşturuldu
                    </div>
                    <div className="list-card mb-4">
                    <span className="list-number mr-3">3</span><span className="date-text">{rowData.date} -</span> {rowData.cargo} numaralı kargo anahtarı için barcode oluşturuldu
                    </div>
                    <div className="list-card">
                    <span className="list-number mr-3">4</span><span className="date-text">{rowData.date} -</span> {rowData.cargo} numaralı kargo anahtarı için barcode oluşturuldu
                    </div>
                </div>
            </div>
            <div className="right-side col-3 mt-4 d-flex flex-column justify-content-between align-items-center">
                <img className="barcode-img" src={Barcode} alt="barcode"></img>
                <span>Cargo Key: <strong>{rowData.cargo}</strong></span>
                <span>Invoice Key: <strong>HC122891409</strong></span>
                <img className="printer-img" src={Printer}></img>
                <img className="yurtici-img" src={Yurtici}></img>
                <button className="custom-btn w-75">Send</button>
            </div>
        </div>
    )

    const orderDetailModal = (
        <div className="row w-100 h-100 m-0">
            <div className="left-side col-9 mt-4">
                <span className="main-subtitle">Sipariş Detayı</span>
                <div className="left-body mt-3 d-flex flex-column justify-content-between p-3">
                    <div className="product-info mb-3">
                        <span className="subtitle">Ürün Bilgileri</span>
                        <div className="row list product-list d-flex my-3 pt-3">
                            <div className="col list-column d-flex flex-column">
                                <span className="title">Fiyat</span>
                                <span>{rowData.total_amount}</span>
                            </div>
                            <div className="col list-column d-flex flex-column">
                                <span className="title">Adet</span>
                                <span>1</span>
                            </div>
                            <div className="col list-column d-flex flex-column">
                                <span className="title">Toplam</span>
                                <span>{rowData.total_amount}</span>
                            </div>
                            <div className="col list-column d-flex flex-column">
                                <span className="title">Stok Kodu</span>
                                <span>CIYA09</span>
                            </div>
                            <div className="col list-column d-flex flex-column">
                                <span className="title">Teslimat Süresi</span>
                                <span>4</span>
                            </div>
                        </div>
                    </div>
                    <div className="customer-info mb-3 mt-5">
                    <span className="subtitle">Müşteri Bilgileri</span>
                        <div className="row list customer d-flex my-3 pt-3">
                            <div className="col list-column d-flex flex-column">
                                <span className="title">Ad</span>
                                <span>Mahmut</span>
                            </div>
                            <div className="col list-column d-flex flex-column">
                                <span className="title">Soyad</span>
                                <span>Tuncer</span>
                            </div>
                            <div className="col list-column d-flex flex-column">
                                <span className="title">Adres</span>
                                <span>İlçe: Sultantepe İl:İstanbul Ülke:Türkiye</span>
                            </div>
                            <div className="col list-column d-flex flex-column">
                                <span className="title">Telefon</span>
                                <span>05558008060</span>
                            </div>
                            <div className="col list-column d-flex flex-column">
                                <span className="title">Hediye Mesajı</span>
                                <span>Upuzun Bir Test Mesajı Görüntüleniyor.</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-history mt-3">
                        <span className="subtitle">Sipariş Geçmişi</span>
                        <div className="history-list p-3 mt-3">
                            Sonuç Yok
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-side col-3 mt-4 d-flex flex-column justify-content-between">
                <div className="top-side d-flex flex-column">
                    <div className="d-flex flex-column">
                        <span className="title">Sipariş Tarihi</span>
                        <span>{rowData.date}</span>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="title">Sipariş ID</span>
                        <span>{rowData.id}</span>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="title">Ödeme Durumu</span>
                        <span>{rowData.payout}</span>
                    </div>
                </div>
                <div className="bot-side d-flex flex-column">
                    <span>Toplam</span>
                    <span>Toplam<span>{rowData.total_amount - 210} TL</span></span>
                    <span>Hipicon Komisyon<span>210 TL</span></span>
                    <span>Sipariş Net<span>{rowData.total_amount} TL</span></span>
                </div>
            </div>
        </div>
    )

    const formItems = (
        Object.entries(rowData).map((entry,index) => 
            <div className="custom-form-group mb-3" key={index}>
                <input type={typeof entry[1] === "number" ? "number":"text"} name={entry[0]} onChange={handleChange} autoComplete="off" value={entry[1]} required />
                <label>{entry[0]}</label>
            </div>
        )
    )

    const editPageModal = (
        <div className="w-100 h-100 m-0 p-2">
            <span className="main-subtitle">Ürün Düzenle</span>
            <form className="custom-form d-flex flex-column align-items-center p-3 mt-3" onSubmit={handleSubmit}>
                {formItems}
                <button
                  className="mt-4 p-2 w-25"
                  type="submit"
                >
                  Düzenle
              </button>
            </form>
        </div>
    )

    return (
        <div>
        <div className="modal-overlay"></div>
        <div className="modal" className={largeModal ? "modal large-modal":"modal small-modal"}>
            <button onClick={closeModal} className="close-button">X</button>
            <div className="modal-guts">
                {
                    isCargoModal ? cargoModal:
                    isOrderModal ? orderDetailModal:
                    isEditPage ? editPageModal:''
                }
            </div>
        </div>
        </div>
    )
  }

  export default DynamicModal;