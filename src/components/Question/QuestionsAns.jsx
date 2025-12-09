import { BiShow } from 'react-icons/bi'
import { RxCross1 } from 'react-icons/rx'

const QuestionsAns = ({ setQuestionDescriptionModal, getQuestion }) => {
  return (
    <div>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[850px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin'>
          <div className='flex items-center justify-between mt-4'>
            <h3
              className='text-[26px] font-bold text-gray-800 capitalize'
              id='modal-title '
            >
              Question
            </h3>
            <button
              type='button'
              className='btn bg-white   p-1 absolute right-3 rounded-full top-3 hover:bg-bgBtnInactive hover:text-btnInactiveColor'
              onClick={() => setQuestionDescriptionModal(false)}
            >
              {' '}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className='mt-2 mb-3' />
          <div className='mt-2 flex justify-between gap-8'>
            <div className='w-[400px]'>
              <p className='mb-1  font-medium'> Questions : </p>
              <p className='mt-1 text-xs text-slate-500 text-justify'>
                {getQuestion?.question_name}
              </p>
              <hr className='mt-1 mb-3' />

              <div className='mx-auto dark:text-gray-800'>
                <div className='overflow-x-auto'>
                  <table className='w-full text-xs text-left whitespace-nowrap border'>
                    <thead>
                      <tr className='dark:bg-gray-300 border text-center'>
                        <th className='p-3 border'>Name</th>
                        <th className='p-3 border'>Phone</th>
                        <th className='p-3 border'>Email</th>
                      </tr>
                    </thead>
                    <tbody className='border-b dark:bg-gray-50 dark:border-gray-300 text-center'>
                      <tr>
                        <td className='px-3 py-2 border'>
                          <p>{getQuestion?.question_user_id?.user_name}</p>
                        </td>

                        <td className='px-3 py-2 border'>
                          <p>{getQuestion?.question_user_id?.user_phone}</p>
                        </td>
                        <td className='px-3 py-2 border'>
                          <p>{getQuestion?.question_user_id?.user_email}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='w-[400px] '>
              <p className='mb-1  font-medium'>Question Ans : </p>
              <p className='mt-1 text-xs text-slate-500 text-justify'>
              {getQuestion?.question_answer}
              </p>
              <hr className='mt-1 mb-3' />
              <div className='mx-auto dark:text-gray-800 '>
                <div className='overflow-x-auto'>
                  <table className='w-full text-xs text-left whitespace-nowrap border'>
                    <thead>
                      <tr className='dark:bg-gray-300 border text-center'>
                        <th className='p-3 border'>Name</th>
                        <th className='p-3 border'>Phone</th>
                        <th className='p-3 border'>Email</th>
                      </tr>
                    </thead>
                    <tbody className='border-b dark:bg-gray-50 dark:border-gray-300 text-center'>
                      <tr>
                        <td className='px-3 py-2 border'>
                          <p>{getQuestion?.question_product_publisher_id?.user_name}</p>
                        </td>

                        <td className='px-3 py-2 border'>
                          <p>{getQuestion?.question_product_publisher_id?.user_name}</p>
                        </td>
                        <td className='px-3 py-2 border'>
                          <p>{getQuestion?.question_product_publisher_id?.user_name}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <p className='mb-1 font-medium'>Review Product Info : </p>
            <div className='overflow-x-auto rounded-t-lg'>
              <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
                <thead className='ltr:text-left rtl:text-right text-center'>
                  <tr>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                      #
                    </th>

                    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                      Product Name
                    </th>

                    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                      See Product Details :
                    </th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200 text-center'>
                  <tr>
                    <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                      #
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                    {getQuestion?.question_product_id?.product_name}
                    </td>

                    <td className='whitespace-nowrap px-4 py-2 '>
                      <button>
                        <BiShow size={22} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionsAns
